import { testIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import { AgencyWordConfig } from "pages/editCase"
import Http from "./Servies"

interface IScale {
    id: number;
    scale: number;
}

export interface IAddCase {
    id?: number;
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
interface IManage {
    id: number;
    username: string;
    scale: number;
}

export interface ICaseDetail {
    caseNumber: string;
    accuser: string;
    defendant: string;
    caseTrial: string;
    caseType: string;
    caseReason: string;
    agency: AgencyWordConfig;
    detail: string;
    host: IManage;
    assiant: IManage[];
}

interface IGetCaseDetail {
    id: number;
}

// 生成新账号
export const get_case_list_api = async () => {
    return await Http.request(`${testIP}/admin/case/list`, {}, 'GET', getHeaders())
}

// 新建案件
export const add_case_api = async (data: IAddCase) => {
    return await Http.request(`${testIP}/admin/case`, data, 'POST', getHeaders())
}

// 修改案件
export const update_case_api = async (data: IAddCase) => {
    return await Http.request(`${testIP}/admin/case`, data, 'PUT', getHeaders())
}

// 获取案件具体信息
export const get_case_detail_api = async (data: IGetCaseDetail) => {
    return await Http.request(`${testIP}/admin/case`, data, 'GET', getHeaders())
}