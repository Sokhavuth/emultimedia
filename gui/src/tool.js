import $ from 'jquery';

class Tool {

  async fetchAPI(uri){
    try{
      let res = await fetch(uri);
      return await res.json();
    }catch(error){
      console.log(error);
    }
  }

  async fetchPostAPI(uri, data){
    const option = {
      method: "POST", 
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    try{
      let res = await fetch(uri, option);
      return await res.json();
    }catch(error){
      console.log(error);
    }
  }

  async checkLogin(){
    const result = await tool.fetchAPI('/admin/logged');
    return result.logged;
  }

  getThumbUrl(content, type=false){
    const noPost = "/images/no-image.png";
    const noUser = "/images/userthumb.png";
    let thumbUrl = '';
    
    const imgs = $(content).find('img');
    if(imgs.length > 0){
      thumbUrl = imgs.first().attr("src");
    }else{
      if(type === 'author')
        thumbUrl = noUser;
      else
        thumbUrl = noPost;
    }
    return (thumbUrl);
  }
  
}// class ending 

const tool = new Tool();

export default tool;