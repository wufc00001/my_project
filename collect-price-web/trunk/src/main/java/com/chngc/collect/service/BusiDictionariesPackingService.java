package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesPackingMapper;
import com.chngc.collect.entity.BusiDictionariesPacking;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author:
 * @Description: 字典-包装版本
 * @Date:Create：in 2019/8/29 15:16
 * @Modified By：
 */
@Slf4j
@Service
public class BusiDictionariesPackingService {
    @Autowired
    private BusiDictionariesPackingMapper busiDictionariesPackingMapper;
    /**
     * 新增
     * @param packing
     */
    public int save(BusiDictionariesPacking packing) {
        int id = busiDictionariesPackingMapper.insert(packing);
        if(id > 0){
            Dictionaries.dictionaries_packing.add(packing);
        }
        return id;
    }

    /**
     * 列表
     * @return
     */
    public List<BusiDictionariesPacking> list() {
        List<BusiDictionariesPacking> packings= busiDictionariesPackingMapper.selectAll();
        return packings;
    }

    /**
     *修改
     * @param packing
     */
    public int saveUpdate(BusiDictionariesPacking packing) {
        int i = busiDictionariesPackingMapper.updateByPrimaryKey(packing);
        if (i>0){
            List<BusiDictionariesPacking> packings = Dictionaries.dictionaries_packing;
            for (BusiDictionariesPacking busiPacking:packings) {
                if (busiPacking.getId().equals(packing.getId())) {
                    busiPacking.setDictionariesValue(packing.getDictionariesValue());
                    busiPacking.setEditTime(packing.getEditTime());
                    busiPacking.setEditUser(packing.getEditUser());
                    break;
                }
            }
        }
        return i;
    }

    /**
     * 查询
     * @return
     */
    public BusiDictionariesPacking selectById(Long id) {
        BusiDictionariesPacking packing= busiDictionariesPackingMapper.selectByPrimaryKey(id);
        return packing;
    }
}
