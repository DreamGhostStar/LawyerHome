import { backIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import Http from "./Servies"

interface IGetUserInfoInSalary {
    userID: number;
}

// 收入页面获取用户信息
export const get_user_info_in_salary_api = async (data: IGetUserInfoInSalary) => {
    return await Http.request(`${backIP}/admin/salary/user`, data, 'GET', getHeaders())
}

// 获取收入列表
export const get_salary_list_api = async (data: IGetUserInfoInSalary) => {
    return await Http.request(`${backIP}/admin/salary/list`, data, 'GET', getHeaders())
}