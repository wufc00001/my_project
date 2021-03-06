package com.chngc.collect.entity;


import java.io.Serializable;
import java.util.Date;

public class BusiGoods implements Serializable {

  private Long id;
  private String projectId;
  private String goodsName;
  private String goodsType;
  private String goodsYear;
  private Long goodsMaterial;
  private String goodsWeight;
  private Long goodsWeightUnit;
  private String goodsShape;
  private String goodsDenomination;
  private Long maxCirculation;
  private Long actualCastingQuantity;
  private String imgUrl;
  private Date createTime;
  private String createUser;
  private Date editTime;
  private String editUser;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getGoodsName() {
    return goodsName;
  }

  public void setGoodsName(String goodsName) {
    this.goodsName = goodsName;
  }

  public String getGoodsType() {
    return goodsType;
  }

  public void setGoodsType(String goodsType) {
    this.goodsType = goodsType;
  }

  public String getGoodsYear() {
    return goodsYear;
  }

  public void setGoodsYear(String goodsYear) {
    this.goodsYear = goodsYear;
  }

  public Long getGoodsMaterial() {
    return goodsMaterial;
  }

  public void setGoodsMaterial(Long goodsMaterial) {
    this.goodsMaterial = goodsMaterial;
  }

  public String getGoodsWeight() {
    return goodsWeight;
  }

  public void setGoodsWeight(String goodsWeight) {
    this.goodsWeight = goodsWeight;
  }

  public Long getGoodsWeightUnit() {
    return goodsWeightUnit;
  }

  public void setGoodsWeightUnit(Long goodsWeightUnit) {
    this.goodsWeightUnit = goodsWeightUnit;
  }

  public String getGoodsShape() {
    return goodsShape;
  }

  public void setGoodsShape(String goodsShape) {
    this.goodsShape = goodsShape;
  }

  public String getGoodsDenomination() {
    return goodsDenomination;
  }

  public void setGoodsDenomination(String goodsDenomination) {
    this.goodsDenomination = goodsDenomination;
  }

  public Long getMaxCirculation() {
    return maxCirculation;
  }

  public void setMaxCirculation(Long maxCirculation) {
    this.maxCirculation = maxCirculation;
  }

  public Long getActualCastingQuantity() {
    return actualCastingQuantity;
  }

  public void setActualCastingQuantity(Long actualCastingQuantity) {
    this.actualCastingQuantity = actualCastingQuantity;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }

  public Date getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  public String getCreateUser() {
    return createUser;
  }

  public void setCreateUser(String createUser) {
    this.createUser = createUser;
  }

  public Date getEditTime() {
    return editTime;
  }

  public void setEditTime(Date editTime) {
    this.editTime = editTime;
  }

  public String getEditUser() {
    return editUser;
  }

  public void setEditUser(String editUser) {
    this.editUser = editUser;
  }
}
