package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiGoodsPrice;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;
import java.util.Map;

@SqlMapper
public interface BusiGoodsPriceMapper {
    /**
     * list
     * @return
     */
    List<Map> list(Map map);
    int listCount(Map map);

    int save(BusiGoodsPrice busiGoodsPrice);

    List<BusiGoodsPrice>  findById(String id);

    int saveUpdate(BusiGoodsPrice busiGoodsPrice);
}
