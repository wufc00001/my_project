package com.chngc.collect.fiter;

import com.chngc.collect.common.Constants;
import io.netty.buffer.ByteBufAllocator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;

import org.springframework.core.io.buffer.NettyDataBufferFactory;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.reactive.ForwardedHeaderFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

import org.springframework.core.io.buffer.DataBuffer;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@Slf4j
public class LoginFiter extends ForwardedHeaderFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        URI reUri = request.getURI();
        log.info("#####reUri####:"+reUri);
        return exchange.getSession().flatMap(session -> {
            log.info("#####reUri####:"+session);
            //判断访问路径   判断是否登陆
            if(reUri.getPath().contains("/user")){
                Map<String, Object> result = new HashMap<>();
                response.getHeaders().setContentType(MediaType.APPLICATION_JSON_UTF8);
                result.put("code", Constants.NOLOGIN_CODE);
                result.put("msg","没有登录");
                DataBuffer resultStr = stringBuffer(result.toString());
                Mono<DataBuffer> just = Mono.just(resultStr);
                return response.writeWith(just);
            }

            //继续执行
            return chain.filter(exchange.mutate().request(request).build());
        });
    }

    /**
     * String to Buffer
     *
     * @param value
     * @return
     */
    protected static DataBuffer stringBuffer(String value) {
        DataBuffer buffer = null;
        if (value != null) {
            byte[] bytes = value.getBytes(StandardCharsets.UTF_8);

            NettyDataBufferFactory nettyDataBufferFactory = new NettyDataBufferFactory(ByteBufAllocator.DEFAULT);
            buffer = nettyDataBufferFactory.allocateBuffer(bytes.length);
            buffer.write(bytes);
        }
        return buffer;
    }
}
