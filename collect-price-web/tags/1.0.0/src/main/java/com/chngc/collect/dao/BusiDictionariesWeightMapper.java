package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesWeight;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

@SqlMapper
public interface BusiDictionariesWeightMapper {
    /**
     * list
     * @return
     */
    List<BusiDictionariesWeight> findAll();

    /**
     * 新增
     * @param busiDictionariesWeight
     * @return
     */
    long save(BusiDictionariesWeight busiDictionariesWeight);

    /**
     * 修改
     * @param busiDictionariesWeight
     * @return
     */
    int saveUpdate(BusiDictionariesWeight busiDictionariesWeight);
}
