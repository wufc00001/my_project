package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesMaterial;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

/**
 * Created by wufc on 2019/8/22.
 */
@SqlMapper
public interface BusiDictionariesMaterialMapper {
    /**
     * 新增
     * @param material
     */
    Long save(BusiDictionariesMaterial material) ;

    /**
     * 查询列表
     * @return
     */
    List<BusiDictionariesMaterial> list();

    /**
     * 修改
     * @param material
     */
    Integer saveUpdate(BusiDictionariesMaterial material);
}
