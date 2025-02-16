class Checkbox {
    #chkId;
    #chkName;
    #isRequired = true;
    #isVisible = true;
    #checkAllCallback = () => {
    };
    #uncheckAllCallback = () => {
    };

    /**
     *
     * @param {string} chkId 전체동의 체크박스 id 값
     * @param {string} chkName 개별 체크박스 name 값
     * @param {boolean} isRequired 필수 체크박스만 선택할것인지
     * @param {boolean} isVisible 노출되고 있는 체크박스만 선택할것인지
     * @param {function} checkAllCallback 전체선택 콜백
     * @param {function} uncheckAllCallback 전체선택해제 콜백
     */
    constructor({chkId = "chkAll", chkName= "chk", isRequired = this.isRequired, isVisible = this.isVisible, checkAllCallback = () => {}, uncheckAllCallback = () => {}, } = {}) {
        this.#chkId = chkId;
        this.#chkName = chkName;
        this.#isRequired = isRequired;
        this.#isVisible = isVisible;
        this.#checkAllCallback = checkAllCallback;
        this.#uncheckAllCallback = uncheckAllCallback;

        this.initCheckboxEvent();
    }

    get chkId() {
        return this.#chkId;
    }

    set chkId(value) {
        this.#chkId = value;
        this.initCheckboxEvent();
    }

    get chkName() {
        return this.#chkName;
    }

    set chkName(value) {
        this.#chkName = value;
        this.initCheckboxEvent();
    }

    get isRequired() {
        return this.#isRequired;
    }


    /**
     * @param {boolean} value
     */
    set isRequired(value) {
        this.#isRequired = value === true;
        this.initCheckboxEvent();
    }


    get isVisible() {
        return this.#isVisible;
    }

    /**
     * @param {boolean} value
     */
    set isVisible(value) {
        this.#isVisible = value === true;
        this.initCheckboxEvent();
    }

    initCheckboxEvent() {
        this.#initMainCheckbox();
        this.#initSubCheckboxes();
    }

    getMainCheckbox() {
        return document.querySelector(`#${this.chkId}`);
    }

    /**
     * @param isChecked 체크된 체크박스 선택
     * @param isRequired 필수 체크박스 선택
     * @param isVisible 화면상 보이는 체크박스 선택
     */
    getSubCheckboxes({isChecked = false, isRequired = this.isRequired, isVisible = this.isVisible} = {}) {
        let selector = `input[name='${this.chkName}']`;
        if (isRequired) selector += `:required`;
        if (isChecked) selector += `:checked`;

        let checkboxes = Array.from(document.querySelectorAll(selector));

        return isVisible ? checkboxes.filter(e => e.checkVisibility()) : checkboxes;
    }

    // 모두 체크되었는지
    isAllChecked() {
        const allCheckboxes = this.getSubCheckboxes();
        return allCheckboxes.length > 0 && allCheckboxes.every(cb => cb.checked);
    }

    /**
     * @description 전체선택 버튼클릭
     */
    #initMainCheckbox() {
        const mainCheckbox = this.getMainCheckbox();

        mainCheckbox.onchange = () => {
            if (mainCheckbox.checked) {
                this.checkAll();
            } else {
                this.uncheckAll();
            }
        };
    }

    /**
     * @description 개별 체크박스 모두 체크되면 전체선택 체크
     */
    #initSubCheckboxes = () =>  {
        const mainCheckbox = this.getMainCheckbox();
        const subCheckboxes = this.getSubCheckboxes();

        subCheckboxes.forEach(e => {
            e.onchange = () => {
                if (this.isAllChecked()) {
                    mainCheckbox.checked = true
                    this.#checkAllCallback();
                } else {
                    mainCheckbox.checked = false;
                    this.#uncheckAllCallback();
                }
            };
        });
    }

    setAllChecked(state) {
        const mainCheckbox = this.getMainCheckbox();
        const subCheckboxes = this.getSubCheckboxes();

        if (!mainCheckbox) return;

        mainCheckbox.checked = state;
        subCheckboxes.forEach(cb => cb.checked = state);
    }

    checkAll() {
        this.setAllChecked(true);
    }

    uncheckAll() {
        this.setAllChecked(false);
    }

    setDisabled(state) {
        const mainCheckbox = this.getMainCheckbox();
        const subCheckboxes = this.getSubCheckboxes();

        if (!mainCheckbox) return;

        mainCheckbox.disabled = state;
        subCheckboxes.forEach(cb => cb.disabled = state);
    }

    /**
     * 클릭 비활성화
     */
    disableAll() {
        this.setDisabled(true);
    }

    /**
     * 클릭 활성화
     */
    enableAll() {
        this.setDisabled(false);
    }


    /**
     * 체크된 항목들의 값 배열화
     */
    getValues() {
        return this.getSubCheckboxes({ isChecked: true }).map(cb => cb.value);
    }
}