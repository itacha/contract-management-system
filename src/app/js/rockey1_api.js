var initVendorId = "ffffffff";
var initUserPin = "ffffffffffffffff";
var initSoPin = "ffffffffffffffff";

var RockeyOne = {
	Ry:null,
	ret:null,
	find : function(vendorId){//根据PID发现加密狗
		//alert("begin Find");
		this.Ry = document.getElementById("don");
		if(vendorId == null)
			this.Ry.R1Pid = initVendorId;
		else
			this.Ry.R1Pid = vendorId;
		this.Ry.Find();
		return this.Ry.Count;
	},
	open : function(vendorId,index){//根据发现索引打开加密狗
		this.Ry.nIndex = index;
		if(vendorId == null)
			this.Ry.R1Pid = initVendorId;
		else
			this.Ry.R1Pid = vendorId;
	    this.ret=this.Ry.Open();
		return this.ret;
	},
	changeUserPin : function (vendorId,oldUserPin,newUserPin){//修改加密狗用户密码
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		for(var i=0;i<vendorCount;i++){
			var openResult = this.open(vendorId,i);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
			
			if(oldUserPin == null || oldUserPin == '' || oldUserPin == undefined)
				this.Ry.UserPin = initUserPin;
			else
				this.Ry.UserPin = oldUserPin;
			this.ret = this.Ry.VerifyUserPin();
			if(this.ret != 0)
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
			this.Ry.buf = newUserPin;
			this.ret = this.Ry.ChangeUserPin();
			if(this.ret != 0)
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
		if(result == 1){
			return {status:"1",msg:"更改用户密码失败的加密狗序列号:"+failHid};
		}
		else
		{
			return {status:"0",msg:"更改加密狗用户密码成功"};
		}
	},
	verifyUserPin : function (vendorId,userPin){//验证用户密码
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		for(var i=0;i<vendorCount;i++){
			var openResult = this.open(vendorId,i);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
			if(userPin == null || userPin == '' || userPin == undefined)
				this.Ry.UserPin = initUserPin;
			else
				this.Ry.UserPin = userPin;
			this.Ry.bTryCount = 5;
			this.ret = this.Ry.VerifyUserPin();
			this.close();
			if(this.ret != 0)
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
		}
		if(result == 1)
		{
			return {status:"1",msg:"验证用户密码失败的加密狗序列号:"+failHid};
		}
		else
		{
			return {status:"0",msg:"验证加密狗用户密码成功"};
		}
	},
	getHid : function (vendorId,index){//获取加密狗序列号
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		if(index == null || index == '' || index == undefined)
		{
			var result = 0;
			var successHid = "";
			for(var i=0;i<vendorCount;i++){
				var openResult = this.open(vendorId,i);
				if(openResult != 0)
				{
					return {status:"1",msg:"打开加密狗失败"};
				}
				this.ret = this.Ry.GetHID();
				this.close();
				if (this.ret==0)
				{
					if(result == 0)
					{
						successHid += this.Ry.buf;
					}
					else
					{
						successHid += ","+this.Ry.buf;
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
			var openResult = this.open(vendorId,index);
			if(openResult != 0)
			{
				return {status:"1",msg:"打开加密狗失败"};
			}
			this.ret = this.Ry.GetHID();
			this.close();
			if (this.ret==0)
			{
				return {status:"0",msg:this.Ry.buf};
			}
			else
			{
				return {status:"1",msg:"获取加密狗序列号失败"};
			}
		}
	},
	verifySoPin : function (vendorId,soPin){//验证开发商密码
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		// for(var i=0;i<vendorCount;i++)
		// {
			var openResult = this.open(vendorId,0);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
				this.Ry.SoPin = initSoPin;
			}
			else
			{
				this.Ry.SoPin = soPin;
			}
			this.Ry.bTryCount = 0;
			this.ret = this.Ry.VerifySoPin();
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
	produceSoPin : function (vendorId,oldSoPin,newSoPinSeed){//修改开发商密码
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		var newSoPin = "";
		for(var i=0;i<vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
				this.Ry.SoPin = initSoPin;
			}
			else
			{
				this.Ry.SoPin = oldSoPin;
			}
			this.Ry.bTryCount = 5;
			var varifyResult = this.Ry.VerifySoPin();
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
			this.Ry.buf = newSoPinSeed;
			this.ret = this.Ry.ProduceSoPin();
			if (this.ret==0)
			{
				if(newSoPin == "")
				{
					newSoPin = this.Ry.SoPin;
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
			if(newSoPin=="")
			{
				return {status:"1",msg:"修改开发商密码失败的加密狗序列号:"+failHid};
			}
			else
			{
				return {status:"1",msg:"修改开发商密码失败的加密狗序列号:"+failHid+";修改成功的加密狗开发商密码为:"+newSoPin};
			}
		}
		else
		{
			return {status:"0",msg:newSoPin};
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
		for(var i=0;i<vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
				this.Ry.SoPin = initSoPin;
			}
			else
			{
				this.Ry.SoPin = oldSoPin;
			}
			this.Ry.bTryCount = 5;
			var varifyResult = this.Ry.VerifySoPin();
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
			this.Ry.buf = newVendorIdSeed;
			this.ret = this.Ry.ProducePID();
			if (this.ret==0)
			{
				if(newPID == "")
				{
					newPID = this.Ry.R1Pid;
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
		this.Ry.Close();
	},
	setAuth : function (vendorId,userPin,soPin,signs){//授权
		
		var vendorCount = this.find(vendorId);
		if(vendorCount == 0 )
		{
			return {status:"1",msg:"没找到加密狗"};
		}
		var result = 0;
		var failHid = "";
		for(var i=0;i<vendorCount;i++)
		{
			var openResult = this.open(vendorId,i);
			this.Ry.GetHID();
			var hid = this.Ry.buf;
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
			if(userPin == null || userPin == '' || userPin == undefined)
			{
				this.Ry.UserPin = initUserPin;
			}
			else
			{
				this.Ry.UserPin = userPin;
			}
			this.Ry.bTryCount = 5;
			var varifyResult = this.Ry.VerifyUserPin();
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
			
			if(soPin == null || soPin == '' || soPin == undefined)
			{	
				this.Ry.SoPin = initSoPin;
			}
			else
			{
				this.Ry.SoPin = soPin;
			}
			this.Ry.bTryCount = 5;
			var varifyResult = this.Ry.VerifySoPin();
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
			this.Ry.bType = 0;
			this.Ry.Id = 0;
			this.Ry.bFlag = 0;
			this.Ry.buf = signs;
			this.ret = this.Ry.RSAEnc();
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
			var authCode = this.Ry.buf;
			// alert("authcode : "+authCode);
			this.Ry.offset = 0;
			this.Ry.length = 1000;
			this.Ry.buf = authCode;
			this.Ry.bType = 0;
			this.ret = this.Ry.Write();
			if (this.ret!=0)
			{
				console.log(parseInt(this.ret, 10).toString(16));
				
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
	}
}
module.exports = RockeyOne