/**
 * ExcelGenerator 클래스
 * XLSX-Populate 라이브러리를 사용해 엑셀 파일을 생성하고 다운로드를 처리합니다.
 */
class ExcelGenerator {
    #headerMap;
    #fileName;

    /**
     * @param {Object} options 초기 설정값
     * @param {Object} [options.headerMap] 데이터 필드와 헤더 이름의 매핑
     * @param {string} [options.fileName='output.xlsx'] 생성할 파일 이름
     */
    constructor({ headerMap = {}, fileName = 'excel.xlsx' }) {
        this.#headerMap = headerMap;
        this.#fileName = this.#ensureFileExtension(fileName || 'excel');
    }

    /**
     * 파일 이름에 .xlsx 확장자가 없으면 추가합니다.
     * @param {string} fileName 파일 이름
     * @returns {string} 확장자가 보장된 파일 이름
     */
    #ensureFileExtension(fileName) {
        return fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
    }

    /**
     * 헤더를 생성합니다.
     * @param {Object[]} data 엑셀로 출력할 데이터 배열
     * @returns {string[]} 헤더 이름 배열
     */
    #generateHeaders(data) {
        if (Object.keys(this.#headerMap).length > 0) {
            return Object.values(this.#headerMap);
        } else if (data.length > 0) {
            return Object.keys(data[0]);
        } else {
            throw new Error('데이터가 존재하지 않습니다.');
        }
    }

    /**
     * 데이터를 헤더 순서에 맞게 배열로 변환합니다.
     * @param {Object[]} data 엑셀로 출력할 데이터 배열
     * @param {string[]} headers 헤더 이름 배열
     * @returns {Array[]} 엑셀 데이터 배열
     */
    #generateRows(data, headers) {
        return data.map(row => {
            return headers.map(header => {
                const fieldKey = Object.keys(this.#headerMap).find(
                        key => this.#headerMap[key] === header
                ) || header;
                return row[fieldKey] || '';
            });
        });
    }

    /**
     * 엑셀 파일 Blob을 생성합니다.
     * @param {Object[]} data 엑셀로 출력할 데이터 배열
     * @param {string} password 암호
     * @returns {Promise<Blob>} 생성된 엑셀 파일 Blob
     */
    async generateExcelBlob(data, password = '') {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('유효한 데이터가 제공되지 않았습니다.');
        }

        const headers = this.#generateHeaders(data);
        const rows = this.#generateRows(data, headers);

        const workbook = await window.XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);

        // 헤더 추가
        sheet.cell('A1').value([headers]);

        // 데이터 추가
        sheet.cell('A2').value(rows);

        // 엑셀 파일 Blob 생성
        if(password){
            return workbook.outputAsync({ type: 'blob' , password: password});
        } else {
            return workbook.outputAsync({ type: 'blob' });
        }
    }

    /**
     * 생성된 엑셀 파일을 브라우저에서 직접 다운로드합니다.
     * @param {Object[]} data 엑셀로 출력할 데이터 배열
     * @param {string} password 사용자 지정 암호
     */
    async downloadExcel(data, password = '') {
        const blob = await this.generateExcelBlob(data, password);

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = this.#fileName;
        link.click();
    }
}