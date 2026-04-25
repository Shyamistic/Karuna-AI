import * as THREE from 'three';

class KarunaOrb {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.setup();
        this.createOrb();
        this.createStars();
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
    }

    setup() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    createOrb() {
        const geometry = new THREE.IcosahedronGeometry(1.5, 32);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0xE28743) }, // Saffron
                intensity: { value: 1.0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec2 vUv;
                uniform float time;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vUv = uv;
                    float distortion = sin(position.x * 2.0 + time * 0.5) * 0.1 +
                                     cos(position.y * 2.0 + time * 0.4) * 0.1;
                    vec3 newPosition = position + normal * distortion;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform vec3 color;
                uniform float intensity;
                void main() {
                    float glow = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                    vec3 finalColor = color + (vec3(1.0) * glow * 0.5);
                    gl_FragColor = vec4(finalColor, glow * intensity);
                }
            `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        this.orb = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.orb);

        const pulseGeometry = new THREE.IcosahedronGeometry(1.4, 16);
        const pulseMaterial = new THREE.MeshBasicMaterial({
            color: 0xE28743,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        this.pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        this.scene.add(this.pulse);

        this.targetColor = new THREE.Color(0xE28743);
        this.targetScale = 1.0;
        this.currentScale = 1.0;
        this.pulseRate = 0.25;
    }

    createStars() {
        const starCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            sizes[i] = Math.random() * 2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: true
        });

        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setState(state, value = 0) {
        switch(state) {
            case 'KARUNA_SPEAKING':
                this.targetColor.setHex(0xE28743);
                this.targetIntensity = 1.2 + value * 0.5;
                this.pulseRate = 2.0;
                this.targetScale = 1.0;
                break;
            case 'USER_SPEAKING':
                this.targetColor.setHex(0x76B5C5);
                this.targetIntensity = 0.5 + value * 0.1; // Gentle glow
                this.pulseRate = 0.2; // Slow, deep breathing
                this.targetScale = 0.9 + value * 0.05; // Very subtle size change
                break;
            case 'EMOTION_SADNESS':
                this.targetColor.setHex(0x5D5B91);
                this.targetIntensity = 0.6;
                this.pulseRate = 0.1;
                break;
            case 'EMOTION_RELIEF':
                this.targetColor.setHex(0xA8E6CF);
                this.targetIntensity = 1.0;
                this.pulseRate = 0.5;
                break;
            case 'SILENCE':
            default:
                this.targetColor.setHex(0x333333);
                this.targetIntensity = 0.3;
                this.pulseRate = 0.25;
                this.targetScale = 0.7;
                break;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = performance.now() * 0.001;
        this.material.uniforms.time.value = time;
        
        if (this.targetIntensity !== undefined) {
            this.material.uniforms.intensity.value += (this.targetIntensity - this.material.uniforms.intensity.value) * 0.05;
        }

        this.material.uniforms.color.value.lerp(this.targetColor, 0.02);
        this.currentScale += (this.targetScale - this.currentScale) * 0.05;

        this.orb.rotation.y += 0.001;
        this.orb.rotation.x += 0.0005;
        
        const pulseScale = this.currentScale + Math.sin(time * this.pulseRate) * 0.1;
        this.orb.scale.set(pulseScale, pulseScale, pulseScale);
        this.pulse.scale.set(pulseScale * 1.05, pulseScale * 1.05, pulseScale * 1.05);
        this.pulse.rotation.y -= 0.002;

        // Subtle star movement
        if (this.stars) {
            this.stars.rotation.y += 0.0002;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

export default KarunaOrb;
