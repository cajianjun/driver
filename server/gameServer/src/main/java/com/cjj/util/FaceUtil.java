package com.cjj.util;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.cjj.dto.face.FaceRecDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FaceUtil {
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
	
	public static List<FaceRecDTO> getFaceDTO(String picUrl) {
		HttpClient httpclient = HttpClientBuilder.create().build();
//   	 HttpClient httpclient = new DefaultHttpClient();

        try
        {
            URIBuilder builder = new URIBuilder(uriBase);

            // Request parameters. All of them are optional.
            builder.setParameter("returnFaceId", "true");
            builder.setParameter("returnFaceLandmarks", "false");
            builder.setParameter("returnFaceAttributes", "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise");

            // Prepare the URI for the REST API call.
            URI uri = builder.build();
            HttpPost request = new HttpPost(uri);

            // Request headers.
            request.setHeader("Content-Type", "application/json");
            request.setHeader("Ocp-Apim-Subscription-Key", subscriptionKey);

            // Request body.
            StringEntity reqEntity = new StringEntity("{\"url\":\"" + picUrl + "\"}");
//            StringEntity reqEntity = new StringEntity("{\"url\":\"https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg\"}");
            request.setEntity(reqEntity);

            // Execute the REST API call and get the response entity.
            HttpResponse response = httpclient.execute(request);
            HttpEntity entity =  response.getEntity();
            if (entity != null)
            {
                // Format and display the JSON response.

           	 ObjectMapper mapper = new ObjectMapper();
                String jsonString = EntityUtils.toString(entity).trim();
                if (jsonString.charAt(0) == '[') {
               	 List<FaceRecDTO> dtos = mapper.readValue(jsonString, new TypeReference<ArrayList<FaceRecDTO>>(){});
               	 return dtos;
                }else {
               	 System.out.println(jsonString);
                }
            }
           
        }
        catch (Exception e)
        {
            // Display error message.
            System.out.println(e.getMessage());
        }
        return new ArrayList<FaceRecDTO>();
	}
}
