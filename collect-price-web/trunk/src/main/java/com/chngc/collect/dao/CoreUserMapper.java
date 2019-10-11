package com.chngc.collect.dao;

import com.chngc.collect.entity.CoreUser;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

/**
 * Created by wufc on 2019/8/22.
 */
@SqlMapper
public interface CoreUserMapper {

    CoreUser getCoreUserByLoginName(String loginName);

    CoreUser getCoreUserByUserId(String userId);

    Integer saveUpdate(CoreUser coreUser);

    void save(CoreUser coreUser);

    List<CoreUser> getAllCoreUser();

    CoreUser getCoreUserByMobile(String mobile);
}
