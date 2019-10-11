package com.chngc.collect.service;

import com.chngc.collect.dao.BusiGoodsMapper;
import com.chngc.collect.entity.*;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class BusiGoodsService {
    @Resource
    private BusiGoodsMapper busiGoodsMapper;


    /**
     * list
     */
    public  List<Map> list(Map map) {
        List<Map> dataMap = busiGoodsMapper.list(map);
        List<Map> returnList=new ArrayList<>();
        for(Map<String,Object> list: dataMap){
            returnList.add(dataFormat(list));
        }
       return returnList;
    }

    public int listCount(Map map) {
        return busiGoodsMapper.listCount(map);
    }

    public int save(BusiGoods busiGoods) {
        return busiGoodsMapper.save(busiGoods);
    }

    public int saveUpdate(BusiGoods busiGoods) {
        return busiGoodsMapper.saveUpdate(busiGoods);
    }
    public int saveUpdateImgUrl(BusiGoods busiGoods) {
        return busiGoodsMapper.saveUpdateImgUrl(busiGoods);
    }

    public Map findById(String id) {
        Map<String, Object> dataMap = busiGoodsMapper.findById(id);
        return dataFormat(dataMap);
        }

    public Map<String, Object> dataFormat( Map<String, Object> map){
        Map<String, Object> dataMap = map;
        Map<String, Object> returnMap=new HashMap<>();
        if(dataMap!=null&&dataMap.size()>0) {
            for (String s : dataMap.keySet()) {
                if ("goods_type".equals(s)) {
                    if ("0".equals(dataMap.get(s))) {
                        returnMap.put("goods_type_value", "单枚");
                    } else {
                        returnMap.put("goods_type_value", "套装");
                    }
                }
                if ("project_id".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("project_id_value", "");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesProject busiDictionariesProject : Dictionaries.dictionaries_project) {
                        if (busiDictionariesProject.getId()==Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("project_id_value", busiDictionariesProject.getProjectName());
                        }
                    }
                }
                if ("goods_material".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("goods_material_value", "");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesMaterial busiDictionariesMaterial : Dictionaries.dictionaries_material) {
                        if (busiDictionariesMaterial.getId()==Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("goods_material_value", busiDictionariesMaterial.getDictionariesValue());
                        }
                    }
                }
                if ("goods_weight_unit".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("goods_weight_value", "");
                        returnMap.put("goods_weight_unit_value", "");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesWeight busiDictionariesWeight : Dictionaries.dictionaries_weight) {
                        if (busiDictionariesWeight.getId()==Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("goods_weight_value",dataMap.get("goods_weight").toString()+busiDictionariesWeight.getDictionariesValue());
                            returnMap.put("goods_weight_unit_value",busiDictionariesWeight.getDictionariesValue());
                        }
                    }
                }
                if ("goods_shape".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("goods_shape_value", "");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesShape busiDictionariesShape : Dictionaries.dictionaries_shape) {
                        if (busiDictionariesShape.getId()==Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("goods_shape_value", busiDictionariesShape.getDictionariesValue());
                        }
                    }
                }
                returnMap.put(s,dataMap.get(s));
            }
        }
        return returnMap;
    }


}
