

export const split4 = (setCols,json) => {
  setCols(() => {
    const newCols = [[], [], [], [],[]];
    json?.map((v,i)=>{
    if((i+1)%4==1){
      newCols[0].push(v)
    }else if((i+1)%4==2){
      newCols[1].push(v)
    }else if((i+1)%4==3){
      newCols[2].push(v)
    }else if((i+1)%4==0){
      newCols[3].push(v)
    }
  })
    return newCols;
  });
};

export const split5 = (setCols,json) => {
    setCols(() => {
      const newCols = [[], [], [], [],[]];
      json?.map((v,i)=>{
      if((i+1)%5==1){
        newCols[0].push(v)
      }else if((i+1)%5==2){
        newCols[1].push(v)
      }else if((i+1)%5==3){
        newCols[2].push(v)
      }else if((i+1)%5==4){
        newCols[3].push(v)
      }else if((i+1)%5==0){
        newCols[4].push(v)
      }
    })
      return newCols;
    });
  };

export const split3 = (setCols,json) => {

    setCols(() => {
      const newCols = [[], [], [], [],[]];
      json?.map((v,i)=>{
      if((i+1)%3==1){
        newCols[0].push(v)
      }else if((i+1)%3==2){
        newCols[1].push(v)
      }else if((i+1)%3==0){
        newCols[2].push(v)
      }
    })
      return newCols; 
    });
  };


  export const split2 = (setCols,json) => {

    setCols(() => {
      const newCols = [[], [], [], [],[]];
      json?.map((v,i)=>{
      if((i+1)%2==1){
        newCols[0].push(v)
      }else if((i+1)%2==0){
        newCols[1].push(v)
      }
    })
      return newCols; 
    });
  };

  