package com.cjj.util;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class MainTest {
	 // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace the subscriptionKey string value with your valid subscription key.
//    public static final String subscriptionKey = "13hc77781f7e4b19b5fcdd72a8df7156";
//    密钥 1: cdbd0d63089c46b5ad1194bd5bbabb00
//
//    密钥 2: 44cfb9e242bf4e28a896fb1b065644dc
    public static final String subscriptionKey = "44cfb9e242bf4e28a896fb1b065644dc";
//    public static final String subscriptionKey = "cdbd0d63089c46b5ad1194bd5bbabb00";

    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    public static final String uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";


    public static void main(String[] args)
    {
//    	 HttpClient httpclient = new DefaultHttpClient();
//
//         try
//         {
//             URIBuilder builder = new URIBuilder(uriBase);
//
//             // Request parameters. All of them are optional.
//             builder.setParameter("returnFaceId", "true");
//             builder.setParameter("returnFaceLandmarks", "false");
//             builder.setParameter("returnFaceAttributes", "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise");
//
//             // Prepare the URI for the REST API call.
//             URI uri = builder.build();
//             HttpPost request = new HttpPost(uri);
//
//             // Request headers.
//             request.setHeader("Content-Type", "application/json");
//             request.setHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//
//             // Request body.
//             StringEntity reqEntity = new StringEntity("{\"url\":\"https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg\"}");
//             request.setEntity(reqEntity);
//
//             // Execute the REST API call and get the response entity.
//             HttpResponse response = httpclient.execute(request);
//             HttpEntity entity = (HttpEntity) response.getEntity();
//             System.out.println(entity.toString());
//            
//         }
//         catch (Exception e)
//         {
//             // Display error message.
//             System.out.println(e.getMessage());
//         }
    	httpReq();
    }
    
    
    private static void httpReq() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Ocp-Apim-Subscription-Key", subscriptionKey);
		
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("returnFaceId", "true");
		queryMap.put("returnFaceLandmarks", "false");
		queryMap.put("returnFaceAttributes", "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise");
		//String url = uriBase + "?" + getParamsStr(queryMap);//
		String url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age%2Cgender%2CheadPose%2Csmile%2CfacialHair%2Cglasses%2Cemotion%2Chair%2Cmakeup%2Cocclusion%2Caccessories%2Cblur%2Cexposure%2Cnoise";
		
		MultiValueMap<String, String> bodyMap = new LinkedMultiValueMap<String, String>();
		bodyMap.add("url", "https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg");
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(bodyMap, headers);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
		String resp = response.getBody();
		System.out.println(resp);
    }
    
    private static String getParamsStr(Map<String,Object> map) {
    	StringBuilder sb = new StringBuilder();
    	Set<String> keys = map.keySet();
    	boolean isFirst = true;
    	for(String key:keys) {
    		String k = "";
    		k = key;
    		String v = "" + map.get(key);;
    		if(isFirst) {
    			isFirst = false;
    		}else {
    			sb.append("&");
    		}
    		sb.append(k).append("=").append(v);
    	}
    	return sb.toString();
    }
}
