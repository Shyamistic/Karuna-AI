class DhvaniSoundscape {
    constructor() {
        this.ctx = null;
        this.osc1 = null;
        this.osc2 = null;
        this.gain = null;
    }

    start() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.gain = this.ctx.createGain();
        this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 5);
        this.gain.connect(this.ctx.destination);

        // Low frequency drone
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1
        this.osc1.connect(this.gain);
        this.osc1.start();

        // Slightly detuned second oscillator for beating effect
        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'sine';
        this.osc2.frequency.setValueAtTime(55.5, this.ctx.currentTime); 
        this.osc2.connect(this.gain);
        this.osc2.start();

        // Subtle filter to make it "airy"
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.ctx.currentTime);
        this.osc1.connect(filter);
        this.osc2.connect(filter);
        filter.connect(this.gain);
    }

    stop() {
        if (!this.gain) return;
        this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
        setTimeout(() => {
            this.osc1.stop();
            this.osc2.stop();
            this.ctx.close();
            this.ctx = null;
        }, 2000);
    }

    setIntensity(val) {
        if (!this.gain) return;
        // Adjust filter or gain based on emotion/intensity
        // This can be expanded later
    }
}

export default DhvaniSoundscape;
