package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesPriceType;
import com.chngc.core.annotation.SqlMapper;
import java.util.List;

/**
 * Created by guolw on 2019/8/29.
 */
@SqlMapper
public interface BusiDictionariesPriceTypeMapper {
    /**
     * 新增价格类型保存
     * @param busiDictionariesPriceType
     * @return
     */
    long save(BusiDictionariesPriceType busiDictionariesPriceType);

    /**
     * 价格类型查询列表
     * @return
     */
    List<BusiDictionariesPriceType> getList();

    /**
     * 价格类型更新
     * @param busiDictionariesPriceType
     * @return
     */
    Long saveUpdate(BusiDictionariesPriceType busiDictionariesPriceType);
}