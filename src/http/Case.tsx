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

interface IGetRequestDetail {
    requestID: number;
}

interface IAddRequestDetail {
    requestID: number;
    message: string;
    isAgree: boolean;
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

// 获取归档请求列表
export const get_request_list_api = async () => {
    return await Http.request(`${testIP}/admin/request/list`, {}, 'GET', getHeaders())
}

// 获取归档请求详情
export const get_request_detail_api = async (data: IGetRequestDetail) => {
    return await Http.request(`${testIP}/admin/request`, data, 'GET', getHeaders())
}

// 提交对归档请求的情况
export const add_request_api = async (data: IAddRequestDetail) => {
    return await Http.request(`${testIP}/admin/request`, data, 'POST', getHeaders())
}