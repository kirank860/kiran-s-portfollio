import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const HeroChromeEffect = ({ scrollYProgress, imageSrc }) => {
    const meshRef = useRef();
    const texture = useTexture(imageSrc);
    const { viewport } = useThree();

    // Shader uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uImage: { value: texture },
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
        }),
        [texture, viewport]
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
            // Map scroll progress (0 to 1) to shader value
            // Multiply and offset to ensure the effect goes completely off-screen at both ends
            meshRef.current.material.uniforms.uScroll.value = scrollYProgress.get() * 2.0 - 0.2;
        }
    });

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform sampler2D uImage;
        uniform float uScroll;
        uniform float uTime;
        varying vec2 vUv;

        // 2D Random
        float random (in vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        // 2D Noise based on Morgan McGuire @morgan3d
        float noise (in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f*f*(3.0-2.0*f);
            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        // Fractal Brownian Motion for liquid details
        #define NUM_OCTAVES 5
        float fbm ( in vec2 _st) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(_st);
                _st = rot * _st * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec4 texColor = texture2D(uImage, vUv);
            
            // Generate flowing liquid noise
            vec2 st = vUv * 3.0;
            st.y -= uTime * 0.15; // Slow downwards movement
            float n = fbm(st + fbm(st + uTime * 0.05));
            
            // Mask threshold: vUv.y goes from 0 at bottom to 1 at top
            float yPos = 1.0 - vUv.y; 
            
            // Add noise to y to get irregular, dripping edges
            float edge = yPos + (n * 0.35);
            
            if (edge > uScroll) {
                // Not yet melted: Show original image
                gl_FragColor = texColor;
            } else {
                // Liquid Chrome Effect
                
                // Calculate fake normals from noise derivatives for 3D lighting
                float eps = 0.02;
                float nx = fbm(st + vec2(eps, 0.0)) - fbm(st - vec2(eps, 0.0));
                float ny = fbm(st + vec2(0.0, eps)) - fbm(st - vec2(0.0, eps));
                vec3 normal = normalize(vec3(nx, ny, 0.15)); 
                
                // Lighting setup for chrome reflection
                vec3 lightDir = normalize(vec3(1.0, 1.2, 1.0));
                vec3 viewDir = vec3(0.0, 0.0, 1.0);
                
                // Reflection vector
                vec3 ref = reflect(-viewDir, normal);
                
                // Fake Environment Mapping (Procedural Matcap)
                float m = 2.0 * sqrt(ref.x*ref.x + ref.y*ref.y + (ref.z+1.0)*(ref.z+1.0));
                vec2 matcapUV = ref.xy / m + 0.5;
                
                vec3 chromeBase = vec3(0.65, 0.7, 0.75); // Silvery blue tint
                float bright = smoothstep(0.4, 0.6, matcapUV.y + matcapUV.x * 0.2);
                float dark = smoothstep(0.4, 0.1, matcapUV.y - matcapUV.x * 0.2);
                vec3 envColor = mix(chromeBase * 0.1, vec3(1.0), bright);
                envColor = mix(envColor, vec3(0.05), dark);
                
                // Intense Specular highlight
                vec3 halfVector = normalize(lightDir + viewDir);
                float specular = pow(max(dot(normal, halfVector), 0.0), 64.0);
                
                vec3 finalColor = envColor + vec3(1.0) * specular * 1.5;
                
                // Bright Edge highlight (liquid meniscus)
                float edgeDist = uScroll - edge;
                if (edgeDist > 0.0 && edgeDist < 0.02) {
                    finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), 0.9);
                }
                
                // Adding a slight glow/shadow cast on the image below
                if (edgeDist > -0.05 && edgeDist <= 0.0) {
                     float shadow = smoothstep(-0.05, 0.0, edgeDist);
                     texColor.rgb *= shadow * 0.5 + 0.5; // Darken original image near the melt
                }
                
                // Preserve the original alpha so it remains a cutout!
                gl_FragColor = vec4(finalColor, texColor.a);
            }
        }
    `;

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
            />
        </mesh>
    );
};

export default HeroChromeEffect;
