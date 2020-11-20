// 根据服务器用户返回的menuList数据和allRoutes进行匹配，得到符合当前用户的有效路由配置

/** 
*
*@param {Array} allRoutes
*@param { Array} menuList

*/
import allRoutes from '../router/allRoutes'
const recursionRoutes=(allRoutes,menuList)=>{
    
    let userRoutes=[]
    allRoutes.forEach(item=>{
        menuList.forEach(v=>{
            if(item.meta.name===v.name){
                // 保证v.children是个数组
                if(v.children&&v.children.length>0){
                     item.children=recursionRoutes(item.children,v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}

export default recursionRoutes