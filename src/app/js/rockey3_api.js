var initVendorId = "00000000";
var initSoPin = "123456781234567812345678";

var RockeyThree = {
	R3:null,
	ret:null,
	find : function(vendorId){
		//alert("begin Find");
		this.R3 = document.getElementById("ROCKEY3");
		if(vendorId == null)
			this.R3.VendorID = initVendorId;//值例:"91927D60";
		else
			this.R3.VendorID = vendorId;//值例:"91927D60";
		this.R3.RY_Find();
		return this.R3.Count;
	},
	open : function(vendorId,index){
		this.R3.index = index;
		if(vendorId == null)
			this.R3.VendorID = initVendorId;//值例:"6945B96D";
		else
			this.R3.VendorID = vendorId;//值例:"6945B96D";
	    this.ret=this.R3.RY_Open();
		return this.ret;
	},
	r3GetHardID : function (vendorId,index){
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		if(index == null || index == '' || index == undefined)
		{
			var result = 0;
			var successHid = "";
			for(var i=1;i<=vendorCount;i++){
				var openResult = this.open(vendorId,i);
				if(openResult != 0)
				{
					return {status:"1",msg:"打开加密狗失败"};
				}
				this.ret = this.R3.RY_GetHardID();
				this.close();
				if (this.ret==0)
				{
					if(result == 0)
					{
						successHid += this.R3.HardID;
					}
					else
					{
						successHid += ","+this.R3.HardID;
					}
					result = 1;
				}
				else
				{
					return {status:"1",msg:"获取加密狗序列号失败"};
				}
			}
			return {status:"0",msg:successHid};
		}
		else
		{
			var openResult = this.open(vendorId,1);
			if(openResult != 0)
			{
				return {status:"1",msg:"打开加密狗失败"};
			}
			this.ret = this.R3.RY_GetHardID();
			this.close();
			if (this.ret==0)
			{
				return {status:"0",msg:this.R3.HardID};
			}
			else
			{
				return {status:"1",msg:"获取加密狗序列号失败"};
			}
		}
	},
	verifySoPin : function (vendorId,soPin){
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		// for(var i=1;i<=vendorCount;i++)
		// {
			var openResult = this.open(vendorId,1);
			this.R3.RY_GetHardID();
			var hid = this.R3.HardID;
			if(openResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				// continue;
			}
			if(soPin == null || soPin == '' || soPin == undefined)
			{	
				this.R3.Buffer = initSoPin;
			}
			else
			{
				this.R3.Buffer = soPin;
			}
			
			this.R3.RemainCount = 0;
			this.R3.InLen = 24;
			this.ret = this.R3.RY_VerifyDevPin();
			if (this.ret!=0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
			}
			this.close();
		// }
		if(result == 1)
		{
			return {status:"1",msg:"验证开发商密码失败的加密狗序列号:"+failHid};
		}
		else
		{
			return {status:"0",msg:hid};
		}
	},
	changeSoPin : function (vendorId,oldSoPin,newSoPin){//修改超级密码
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		for(var i=1;i<=vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.R3.RY_GetHardID();
			var hid = this.R3.HardID;
			if(openResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			if(oldSoPin == null || oldSoPin == '' || oldSoPin == undefined)
			{	
				this.R3.Buffer = initSoPin;
			}
			else
			{
				this.R3.Buffer = oldSoPin;
			}
			this.R3.RemainCount = 0;
			this.R3.InLen = 24;
			var varifyResult = this.R3.RY_VerifyDevPin();
			if(varifyResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			
			this.R3.Buffer = oldSoPin;
			this.R3.Buffer2 = newSoPin;
			this.R3.InLen = 24; 
			this.R3.RemainCount = 255;
			this.ret = this.R3.RY_ChangeDevPin();
			if (this.ret!=0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
			}
			this.close();
		}
		if(result == 1)
		{
			return {status:"1",msg:"修改开发商密码失败的加密狗序列号:"+failHid};
		}
		else
		{
			return {status:"0",msg:"修改加密狗开发商密码成功"};
		}
	},
	producePID : function (vendorId,oldSoPin,newVendorIdSeed){//修改PID
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		var newPID = "";
		for(var i=1;i<=vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.R3.RY_GetHardID();
			var hid = this.R3.HardID;
			if(openResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			if(oldSoPin == null || oldSoPin == '' || oldSoPin == undefined)
			{	
				this.R3.Buffer = initSoPin;
			}
			else
			{
				this.R3.Buffer = oldSoPin;
			}
			this.R3.RemainCount = 0;
			this.R3.InLen = 24;
			var varifyResult = this.R3.RY_VerifyDevPin();
			if(varifyResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			
			this.R3.Buffer = newVendorIdSeed;
			this.R3.InLen = this.R3.Buffer.length;
			this.ret = this.R3.RY_SetVendorID();
			if (this.ret==0)
			{
				if(newPID == "")
				{
					newPID = this.R3.Buffer;
				}
			}
			else
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
			}
			this.close();
		}
		if(result == 1)
		{
			if(newPID=="")
			{
				return {status:"1",msg:"修改PID失败的加密狗序列号:"+failHid};
			}
			else
			{
				return {status:"1",msg:"修改PID失败的加密狗序列号:"+failHid+";修改成功的加密狗PID为:"+newPID};
			}
		}
		else
		{
			return {status:"0",msg:newPID};
		}
	},
	close : function (){
		this.R3.RY_Close();
	},
	setAuthCode : function (vendorId,soPin,signs){
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		for(var i=1;i<=vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.R3.RY_GetHardID();
			var hid = this.R3.HardID;
			if(openResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			
			if(soPin == null || soPin == '' || soPin == undefined)
			{	
				this.R3.Buffer = initSoPin;
			}
			else
			{
				this.R3.Buffer = soPin;
			}
			this.R3.RemainCount = 0;
			this.R3.InLen = 24;
			var varifyResult = this.R3.RY_VerifyDevPin();
			if(varifyResult != 0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			var cover = 128 - signs.length;
			for(var j=0;j<cover;j++)
			{
				signs+=" ";
			}
			this.R3.InLen = 172;
			this.R3.Buffer = this.base64encode(signs);
			this.R3.KeyID = 1;
			this.ret = this.R3.RY_PublicEncrypt();
			if (this.ret!=0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
				continue;
			}
			var authCode = this.R3.Buffer;
			this.R3.Offset = 0;
			this.R3.Buffer = authCode;
			this.R3.InLen = this.R3.Buffer.length;
			this.ret = this.R3.RY_Write();
			if (this.ret!=0)
			{
				if(result == 0)
				{
					failHid += hid;
				}
				else
				{
					failHid += ","+hid;
				}
				result = 1;
			}
			this.close();
		}
		if(result == 1)
		{
			return {status:"1",msg:"授权失败的加密狗序列号:"+failHid};
		}
		else
		{
			return {status:"0",msg:"授权成功"};
		}
	},
	base64EncodeChars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64DecodeChars:new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
    base64encode:function(str) {
		var returnVal, i, len;
		var c1, c2, c3;
		len = str.length;
		i = 0;
		returnVal = "";
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i == len) {
				returnVal += this.base64EncodeChars.charAt(c1 >> 2);
				returnVal += this.base64EncodeChars.charAt((c1 & 0x3) << 4);
				returnVal += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i == len) {
				returnVal += this.base64EncodeChars.charAt(c1 >> 2);
				returnVal += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				returnVal += this.base64EncodeChars.charAt((c2 & 0xF) << 2);
				returnVal += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			returnVal += this.base64EncodeChars.charAt(c1 >> 2);
			returnVal += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			returnVal += this.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			returnVal += this.base64EncodeChars.charAt(c3 & 0x3F);
		}
		return returnVal;
	},
    base64decode:function (str) {
		var c1, c2, c3, c4;
		var i, len, returnVal;
		len = str.length;
		i = 0;
		returnVal = "";
		while (i < len) {
			/*c1*/
			do {
				c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c1 == -1);
			if (c1 == -1)
				break;
			/*c2*/
			do {
				c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c2 == -1);
			if (c2 == -1)
				break;
			returnVal += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
			/*c3*/
			do {
				c3 = str.charCodeAt(i++) & 0xff;
				if (c3 == 61)
					return returnVal;
				c3 = this.base64DecodeChars[c3];
			} while (i < len && c3 == -1);
			if (c3 == -1)
				break;
			returnVal += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
			/*c4*/
			do {
				c4 = str.charCodeAt(i++) & 0xff;
				if (c4 == 61)
					return returnVal;
				c4 = this.base64DecodeChars[c4];
			} while (i < len && c4 == -1);
			if (c4 == -1)
				break;
			returnVal += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		}
		return returnVal;
	}
}
module.exports = RockeyThree