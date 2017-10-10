//package com.weiwei.patent.config;
//
//import javax.sql.DataSource;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
//import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
//import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
//
//import com.weiwei.common.Constants;
//
//@Configuration
//@EnableResourceServer
//public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
//
//	@Autowired
//	private DataSource dataSource;
//
//	@Bean
//	public JdbcTokenStore tokenStore() {
//		return new JdbcTokenStore(dataSource);
//	}
//
//	@Override
//	public void configure(final HttpSecurity http) throws Exception {
//		http.authorizeRequests()
//				.antMatchers(
//						"/swagger-ui.html","/swagger-resources/**","/webjars/**","/v2/**"//这三个用来跳过swagger需要访问的资源的auth验证
//						, Constants.QUERY + "/**"
//						, Constants.PATENT_INFO + "/**"
//						, "/docs/**"
//						, "/admin/es/log"
//						, "/order/payback"//支付回调
//						, "/order/payCallback"//支付回调
//						, Constants.TRADE_INFO + "/**"
//						, Constants.TRADING_QUERY + "/**"
//						, Constants.RECOMMEND + "/**")
//				.permitAll().antMatchers("/admin/**").hasAnyRole("ADMIN");
//		http.authorizeRequests().anyRequest().authenticated();
//	}
//
//	@Override
//	public void configure(ResourceServerSecurityConfigurer resources) {
//		resources.tokenStore(tokenStore());
//	}
//
//}
