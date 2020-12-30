import { testIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import Http from "./Servies"

interface IScale {
    id: number;
    scale: number;
}

interface IAddCase {
    caseNumber: string;
    accuser: string;
    defendant: string;
    caseTrial: string;
    caseType: string;
    caseReason: string;
    agency: string;
    detail: string;
    host: IScale;
    assiant: IScale[];
}

// 生成新账号
export const get_case_list_api = async () => {
    return await Http.request(`${testIP}/admin/case/list`, {}, 'GET', getHeaders())
}

// 新建案件
export const add_case_api = async (data: IAddCase) => {
    return await Http.request(`${testIP}/admin/case`, data, 'POST', getHeaders())
}