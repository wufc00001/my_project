package com.chngc.collect.vo;

import com.chngc.collect.entity.CoreComponent;
import com.chngc.collect.entity.CoreUser;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wufc on 2019/8/23.
 */
@Data
public class Permission {

    // 登录状态 99 未登录  00 登录
    private String loginState = "99";

    // 登录信息
    private String userId;

    private String loginName;

    private String realName;

    // 用户权限componentCode : true
    private Map<String,Map<String,Object>> components = new HashMap<>();

}
