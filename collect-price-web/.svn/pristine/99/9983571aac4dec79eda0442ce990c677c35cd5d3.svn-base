package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiGoods;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;
import java.util.Map;

@SqlMapper
public interface BusiGoodsMapper {
    /**
     * list
     * @return
     */
    List<Map> list(Map map);

    /**
     * list条数
     * @param map
     * @return
     */
    int listCount(Map map);

    int save(BusiGoods busiGoods);
    Map  findById(String id);

    int saveUpdate(BusiGoods busiGoods);
    int saveUpdateImgUrl(BusiGoods busiGoods);
}
