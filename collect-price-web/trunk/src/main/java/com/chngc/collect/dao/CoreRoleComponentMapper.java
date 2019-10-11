package com.chngc.collect.dao;

import com.chngc.collect.entity.CoreRoleComponent;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/8/22.
 */
@SqlMapper
public interface CoreRoleComponentMapper {
    /**
     * 根据角色id 查询权限
     * @param roleIds
     * @return
     */
    List<Map<String,Object>> getPermissionComponentCode(String[] roleIds);
}
