package com.chngc.collect.service;

import com.chngc.collect.dao.BusiGoodsPriceMapper;
import com.chngc.collect.entity.*;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class BusiGoodsPriceService {
    @Resource
    private BusiGoodsPriceMapper busiGoodsPriceMapper;


    /**
     * list
     */
    public List<Map> list(Map map) {
        List<Map> dataMap = busiGoodsPriceMapper.list(map);
        List<Map> returnList = new ArrayList<>();
        for (Map<String, Object> list : dataMap) {
            returnList.add(dataFormat(list));
        }
        return returnList;
//     return busiGoodsPriceMapper.list(map);
    }

    public int listCount(Map map) {
        return busiGoodsPriceMapper.listCount(map);
    }

    public int save(BusiGoodsPrice busiGoodsPrice) {
        return busiGoodsPriceMapper.save(busiGoodsPrice);
    }

    public int saveUpdate(BusiGoodsPrice busiGoodsPrice) {
        return busiGoodsPriceMapper.saveUpdate(busiGoodsPrice);
    }

    public BusiGoodsPrice findById(String id) {
        List<BusiGoodsPrice> list = busiGoodsPriceMapper.findById(id);
        if (list != null && list.size() > 0) {
            return list.get(0);
        }
        return null;
    }

    public Map<String, Object> dataFormat(Map<String, Object> map) {
        Map<String, Object> dataMap = map;
        Map<String, Object> returnMap = new HashMap<>();
        if (dataMap != null && dataMap.size() > 0) {
            for (String s : dataMap.keySet()) {
                if ("goods_packing".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("goods_packing_value","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesPacking busiDictionariesPacking : Dictionaries.dictionaries_packing) {
                        if (busiDictionariesPacking.getId() == Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("goods_packing_value", busiDictionariesPacking.getDictionariesValue());
                        }
                    }
                }
                if ("certification_authority".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("certification_authority_value","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesCertificationAuthority busiDictionariesCertificationAuthority : Dictionaries.dictionaries_certification_authority) {
                        if (busiDictionariesCertificationAuthority.getId() == Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("certification_authority_value", busiDictionariesCertificationAuthority.getDictionariesValue());
                        }
                    }
                }
                if ("rating_agencies".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("rating_agencies_value","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesRatingAgencies busiDictionariesRatingAgencies : Dictionaries.dictionaries_rating_agencies) {
                        if (busiDictionariesRatingAgencies.getId() == Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("rating_agencies_value", busiDictionariesRatingAgencies.getDictionariesValue());
                        }
                    }
                }
                if ("price_type".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("price_type_value","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesPriceType busiDictionariesPriceType : Dictionaries.dictionaries_price_type) {
                        if (busiDictionariesPriceType.getId() == Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("price_type_value", busiDictionariesPriceType.getDictionariesValue());
                        }
                    }
                }
                if ("price_source".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("price_source_value","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    for (BusiDictionariesPriceSource busiDictionariesPriceSource : Dictionaries.dictionaries_price_source) {
                        if (busiDictionariesPriceSource.getId() == Long.parseLong(dataMap.get(s).toString())) {
                            returnMap.put("price_source_value", busiDictionariesPriceSource.getDictionariesValue());
                        }
                    }
                }
                if ("business_time".equals(s)) {
                    if (dataMap.get(s) == null) {
                        returnMap.put("business_time","");
                        returnMap.put(s, dataMap.get(s));
                        continue;
                    }
                    returnMap.put("business_time", dataMap.get(s).toString().substring(0, 10));
                    continue;
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

                returnMap.put(s, dataMap.get(s));
            }
        }
        return returnMap;
    }

}
