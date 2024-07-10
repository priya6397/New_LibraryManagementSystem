package com.library.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
        private boolean status =Boolean.FALSE;
        private String message="Data Fetch Successfully";
        private Object data;

        public ApiResponse( String message, boolean status, Object data) {
            this.status = status;
            this.message = message;
            this.data = data;
        }

        public ApiResponse(boolean status, Object data){
            this.status=status;
            this.data=data;
        }

        public ApiResponse(String message, boolean status) {
            this.status = status;
            this.message = message;
        }
}
