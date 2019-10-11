package com.chngc.collect.dao;


import com.chngc.collect.entity.BusiDictionariesPriceSource;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

/**
 * Created by guolw on 2019/8/30.
 */
@SqlMapper
public interface BusiDictionariesPriceSourceMapper {
    /**
     * 价格来源新增保存
     * @param busiDictionariesPriceSource
     * @return
     */
    Long save(BusiDictionariesPriceSource busiDictionariesPriceSource);

    /**
     * 价格来源查询列表
     * @return
     */
    List<BusiDictionariesPriceSource> getList();

    /**
     *价格来源更新
     * @param busiDictionariesPriceSource
     * @return
     */
    Long saveUpdate(BusiDictionariesPriceSource busiDictionariesPriceSource);
}