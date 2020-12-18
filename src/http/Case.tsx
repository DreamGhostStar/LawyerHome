import { testIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import Http from "./Servies"

// 生成新账号
export const get_case_list_api = async () => {
    return await Http.request(`${testIP}/admin/case/list`, {}, 'GET', getHeaders())
}