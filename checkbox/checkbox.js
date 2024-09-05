class Checkbox {
    _chkId;
    _chkName;
    _isRequired = true;
    _isVisible = true;

    /**
     *
     * @param {string} chkId 전체동의 체크박스 id 값
     * @param {string} chkName 개별 체크박스 name 값
     * @param {boolean} isRequired 필수 체크박스만 선택할것인지
     * @param {boolean} isVisible 노출되고 있는 체크박스만 선택할것인지
     */
    constructor({chkId = "chkAll", chkName= "chk", isRequired = this.isRequired, isVisible = this.isVisible} = {}) {
        this._chkId = chkId;
        this._chkName = chkName;
        this._isRequired = isRequired;
        this._isVisible = isVisible;

        this.initCheckboxEvent();
    }

    get chkId() {
        return this._chkId;
    }

    set chkId(value) {
        this._chkId = value;
        this.initCheckboxEvent();
    }

    get chkName() {
        return this._chkName;
    }

    set chkName(value) {
        this._chkName = value;
        this.initCheckboxEvent();
    }

    get isRequired() {
        return this._isRequired;
    }

    set isRequired(value) {
        this._isRequired = value;
        this.initCheckboxEvent();
    }


    get isVisible() {
        return this._isVisible;
    }

    set isVisible(value) {
        this._isVisible = value;
        this.initCheckboxEvent();
    }

    initCheckboxEvent() {
        this.initMainCheckbox();
        this.initSubCheckboxes();
    }

    getMainCheckbox() {
        return document.querySelector(`#${this.chkId}`);
    }

    /**
     * @param isRequired 필수 체크박스 선택
     * @param checkedOnly 체크된 체크박스 선택
     * @param isVisible 화면상 보이는 체크박스 선택
     * @return {NodeListOf<HTMLElement>|NodeListOf<Element>}
     */
    getSubCheckboxes({checkedOnly = false, isRequired = this.isRequired, isVisible = this.isVisible} = {}) {
        let checkboxes = [];
        let filteredCheckboxes = [];

        if (isRequired && checkedOnly) {
            checkboxes = document.querySelectorAll(`input[name='${this.chkName}']:required:checked`);

            checkboxes.forEach(e => {
                if (e.checkVisibility()) {
                    filteredCheckboxes.push(e);
                }
            });
        } else if (isRequired) {
            checkboxes = document.querySelectorAll(`input[name='${this.chkName}']:required`);

            checkboxes.forEach(e => {
                if (e.checkVisibility()) {
                    filteredCheckboxes.push(e);
                }
            });
        } else  if (checkedOnly) {
            checkboxes = document.querySelectorAll(`input[name='${this.chkName}']:checked`);

            checkboxes.forEach(e => {
                if (e.checkVisibility()) {
                    filteredCheckboxes.push(e);
                }
            });
        } else {
            checkboxes = document.querySelectorAll(`input[name='${this.chkName}']`);

            checkboxes.forEach(e => {
                if (e.checkVisibility()) {
                    filteredCheckboxes.push(e);
                }
            });
        }

        if (isVisible) {
            return filteredCheckboxes;
        } else {
            return checkboxes;
        }
    }

    // 모두 체크되었는지
    isAllChecked() {
        if(this.getSubCheckboxes().length !== 0){
            return this.getSubCheckboxes().length === this.getSubCheckboxes({checkedOnly: true}).length;
        } else {
            return false;
        }
    }

    /**
     * @description 전체선택 버튼클릭
     */
    initMainCheckbox() {
        const mainCheckbox = this.getMainCheckbox();

        mainCheckbox.onchange = ev => {
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
    initSubCheckboxes() {
        const self = this;
        const mainCheckbox = self.getMainCheckbox();
        const subCheckboxes = self.getSubCheckboxes();

        subCheckboxes.forEach(function (e) {
            e.onchange = () => {
                mainCheckbox.checked = self.isAllChecked();
            };
        });
    }

    /**
     * @description 전체선택(선택항목 제외)
     */
    checkAll() {
        const mainCheckbox = this.getMainCheckbox();
        const subCheckboxes = this.getSubCheckboxes();

        mainCheckbox.checked = true;
        subCheckboxes.forEach(function (e){
            e.checked = true;
        });
    }

    /**
     * @description 전체선택해제(선택항목 포함)
     */
    uncheckAll() {
        const self = this;
        const mainCheckbox = self.getMainCheckbox();
        const subCheckboxes = self.getSubCheckboxes(); // 모든 체크박스

        mainCheckbox.checked = false;
        subCheckboxes.forEach(function (e){
            e.checked = false;
        });
    }

    /**
     * 클릭 비활성화
     */
    disableAll() {
        const self = this;
        const mainCheckbox = self.getMainCheckbox();
        const subCheckboxes = self.getSubCheckboxes(); // 모든 체크박스

        mainCheckbox.disabled = true;
        subCheckboxes.forEach(function (e){
            e.disabled = true;
        });
    }

    /**
     * 클릭 활성화
     */
    enableAll() {
        const self = this;
        const mainCheckbox = self.getMainCheckbox();
        const subCheckboxes = self.getSubCheckboxes(); // 모든 체크박스

        mainCheckbox.disabled = false;
        subCheckboxes.forEach(function (e){
            e.disabled = false;
        });
    }

    /**
     * 체크된 항목들의 값 배열화
     */
    getValues() {
        const subCheckboxes = this.getSubCheckboxes({checkedOnly: true});
        const values = [];

        subCheckboxes.forEach(e => {
            values.push(e.value)
        });

        return values;
    }
}