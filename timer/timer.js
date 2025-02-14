export class Timer {
    static DEFAULT_TIME = 180;
    static DEFAULT_INTERVAL = 1000;

    #sec = 0;         // 현재 남은 초 (private)
    #initSec = 0;     // 초기 시간 (private)
    #interval = null; // setInterval 핸들러 (private)
    #timeout = Timer.DEFAULT_INTERVAL; // 타이머 간격 (private)

    constructor(sec = Timer.DEFAULT_TIME, timeout = Timer.DEFAULT_INTERVAL) {
        this.#initSec = sec;
        this.#sec = sec;
        this.#timeout = timeout;
    }

    /**
     * 타이머 시작
     * @param {Object} timerHandler
     * @param {Function} [timerHandler.start] 시작 시 실행할 함수
     * @param {Function} [timerHandler.interval] 매 틱마다 실행할 함수
     * @param {Function} [timerHandler.end] 종료 시 실행할 함수
     */
    startTimer(timerHandler = {}) {
        this.resetTimer();

        if (typeof timerHandler.start === 'function') {
            timerHandler.start(this);
        }

        this.#interval = setInterval(() => {
            if (this.#sec < 1) {
                this.removeTimer();
                if (typeof timerHandler.end === 'function') {
                    timerHandler.end(this);
                }
            }

            if (typeof timerHandler.interval === 'function') {
                timerHandler.interval(this);
            }

            this.#sec -= 1;
        }, this.#timeout);
    }

    /**
     * 타이머 초기화 (시간 리셋 및 인터벌 정리)
     */
    resetTimer() {
        this.removeTimer();
        this.#sec = this.#initSec;
    }

    /**
     * 현재 남은 시간을 "MM:SS" 형식으로 반환
     * @returns {string}
     */
    getTime() {
        const minutes = String(Math.floor(this.#sec / 60)).padStart(2, '0');
        const seconds = String(this.#sec % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    /**
     * 현재 초 단위 값 반환
     * @returns {number}
     */
    getCurrentSecond() {
        return this.#sec;
    }

    /**
     * 타이머 중지
     */
    removeTimer() {
        if (this.#interval) {
            clearInterval(this.#interval);
            this.#interval = null;
        }
    }
}
