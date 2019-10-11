package com.chngc.collect.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.chngc.collect.common.Constants;
import com.chngc.collect.service.CoreComponentService;
import com.chngc.core.common.ResponseResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class LoginControllerInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private CoreComponentService coreComponentService;
	@Override
	public boolean preHandle(HttpServletRequest request,
							 HttpServletResponse response, Object handler) throws Exception {

		HttpSession session = request.getSession(true);
		Object userId = session.getAttribute("userId");
		if (userId == null) {
			log.info("####没有登录,去登录页面####");
			ResponseResult result = new ResponseResult();
			response.setContentType("application/json; charset=UTF-8");
			result.setCode(Constants.NOLOGIN_CODE);
			result.setMsg(Constants.NOLOGIN_MSG);
			PrintWriter out = response.getWriter();
			JSONObject obj = (JSONObject) JSONObject.toJSON(result);
			out.print(obj);
			out.close();
			return false;
		} else {
			// 判断路径是否合法
			String requestUrl = request.getRequestURI();
			if("/manager/busi_goods_price/add".equals(requestUrl)){
				return true;
			}
			if("/manager/busi_goods/add".equals(requestUrl)){
				return true;
			}
			Map<String,Map> permissionMap = (Map) session.getAttribute("components");
			// 判断访问是否有权限
			String permissionCode = request.getParameter("componentCode");
			Map<String,Object> permissionFlag = null;
			if(permissionCode != null){
				 permissionFlag = permissionMap.get(permissionCode);
			}
			log.info("【访问权限code】:"+permissionCode);
			if(permissionCode == null||permissionFlag == null){
				log.info("########没有访问权限####");
				ResponseResult result = new ResponseResult();
				response.setContentType("application/json; charset=UTF-8");
				result.setCode(Constants.NOPERSSION_CODE);
				result.setMsg(Constants.NOPERSSION_MSG);
				PrintWriter out = response.getWriter();
				JSONObject obj = (JSONObject) JSONObject.toJSON(result);
				out.print(obj);
				out.close();
				return false;
			}

			String permissionUrl = coreComponentService.findCoreComponentByCode(permissionCode);
			log.info("【permissionUrl】:"+permissionUrl);
			if(!requestUrl.equals(permissionUrl)){
				log.info("没有访问权限【requestUrl】:"+requestUrl);
				ResponseResult result = new ResponseResult();
				response.setContentType("application/json; charset=UTF-8");
			    result.setCode(Constants.NOPERSSION_CODE);
				result.setMsg(Constants.NOPERSSION_MSG);
				PrintWriter out = response.getWriter();
				JSONObject obj = (JSONObject) JSONObject.toJSON(result);
				out.print(obj);
				out.close();
				return false;
			}
			return true;
		}
	}

	@Override
	public void postHandle(HttpServletRequest request,
						   HttpServletResponse response, Object handler,
						   ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
								HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}
}
