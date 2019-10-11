package com.chngc.collect.util;

import com.chngc.collect.entity.BusiDictionariesMaterial;
import com.chngc.collect.entity.BusiDictionariesProject;
import com.chngc.collect.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

@Component
public class DictionariesInit implements CommandLineRunner {
    @Autowired
    private BusiDictionariesWeightService busiDictionariesWeightService;
    @Autowired
    private BusiDictionariesPriceTypeService busiDictionariesPriceTypeService;
    @Autowired
    private BusiDictionariesProjectService busiDictionariesProjectService;
    @Autowired
    private BusiDictionariesMaterialService busiDictionariesMaterialService;
    @Autowired
    private BusiDictionariesShapeService busiDictionariesShapeService;
    @Autowired
    private BusiDictionariesPriceSourceService busiDictionariesPriceSourceService;
    @Autowired
    private BusiDictionariesCertificationAuthorityService busiDictionariesCertificationAuthorityService;
    @Autowired
    private BusiDictionariesPackingService busiDictionariesPackingService;
    @Autowired
    private BusiDictionariesRatingAgenciesService busiDictionariesRatingAgenciesService;
    @Override
    public void run(String... strings) throws Exception {
        Dictionaries.dictionaries_year=new ArrayList<>();
        Calendar date = Calendar.getInstance();
        int SysYear= date.get(Calendar.YEAR);
        SysYear=SysYear-10;
        int month=  date.get(Calendar.MONTH);
        if(month>=9){
            SysYear+=1;
        }
        for(int i=10;i>=0;i--){
            Dictionaries.dictionaries_year.add(SysYear+i);
        }
        Dictionaries.dictionaries_weight=busiDictionariesWeightService.findAll();
        Dictionaries.dictionaries_price_type = busiDictionariesPriceTypeService.getList();
        Dictionaries.dictionaries_price_source = busiDictionariesPriceSourceService.getLsit();
        Dictionaries.dictionaries_project=busiDictionariesProjectService.list();
        Dictionaries.dictionaries_material=busiDictionariesMaterialService.list();
        Dictionaries.dictionaries_shape= busiDictionariesShapeService.findAll();
        Dictionaries.dictionaries_certification_authority = busiDictionariesCertificationAuthorityService.list();
        Dictionaries.dictionaries_packing = busiDictionariesPackingService.list();
        Dictionaries.dictionaries_rating_agencies = busiDictionariesRatingAgenciesService.list();
        System.out.println("字典初始化");
    }
}