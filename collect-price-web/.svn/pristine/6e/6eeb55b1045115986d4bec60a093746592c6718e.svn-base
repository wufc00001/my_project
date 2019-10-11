package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesMaterialMapper;
import com.chngc.collect.entity.BusiDictionariesMaterial;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wufc on 2019/8/23.
 */
@Slf4j
@Service
public class BusiDictionariesMaterialService {

    @Autowired
    private BusiDictionariesMaterialMapper busiDictionariesMaterialMapper;

    /**
     * 新增  字典-材质
     * @param material
     */
    public Long save(BusiDictionariesMaterial material) {
        Long materialId = busiDictionariesMaterialMapper.save(material);
        if(materialId > 0){
            Dictionaries.dictionaries_material.add(material);
        }
        return materialId;
    }

    /**
     * 查询列表 字典-材质
     * @return
     */
    public List<BusiDictionariesMaterial> list() {
        List<BusiDictionariesMaterial> projects= busiDictionariesMaterialMapper.list();
        return projects;
    }
    /**
     * 修改 字典-材质
     * @return
     */
    public Integer saveUpdate(BusiDictionariesMaterial material) {
        Integer num = busiDictionariesMaterialMapper.saveUpdate(material);
        if(num > 0){
            List<BusiDictionariesMaterial> list = Dictionaries.dictionaries_material;
            for (BusiDictionariesMaterial busiMaterial:list) {
                if (busiMaterial.getId().equals(material.getId())) {
                    busiMaterial.setDictionariesValue(material.getDictionariesValue());
                    busiMaterial.setEditTime(material.getEditTime());
                    busiMaterial.setEditUser(material.getEditUser());
                    break;
                }
            }
        }
        return num;
    }
}
