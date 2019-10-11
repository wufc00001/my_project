package com.chngc.collect.dao;

import com.chngc.collect.entity.CoreComponent;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

/**
 * Created by wufc on 2019/8/22.
 */
@SqlMapper
public interface CoreComponentMapper {

    List<CoreComponent> getAll();

    String findCoreComponentByCode(String permissionCode);
}
