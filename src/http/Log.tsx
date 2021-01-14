import { testIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import Http from "./Servies"

interface IGetLog {
    userID: number;
    year: number;
    month: number;
    day: number;
}

// 获取案件具体信息
export const get_log_api = async (data: IGetLog) => {
    return await Http.request(`${testIP}/admin/log`, data, 'GET', getHeaders())
}