package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesShape;
import com.chngc.collect.entity.BusiDictionariesWeight;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

@SqlMapper
public interface BusiDictionariesShapeMapper {
    /**
     * list
     * @return
     */
    List<BusiDictionariesShape> findAll();

    /**
     * 新增
     * @param busiDictionariesShape
     * @return
     */
    long save(BusiDictionariesShape busiDictionariesShape);

    /**
     * 修改
     * @param busiDictionariesShape
     * @return
     */
    int saveUpdate(BusiDictionariesShape busiDictionariesShape);
}
