

export const split4 = (setCols:any,json:any) => {
  setCols(() => {
    const newCols:number[][] = [[], [], [], []];
    json?.map((v:any,i:any)=>{
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
    return newCols; // Mengembalikan array kolom yang diperbarui
  });
};

export const split3 = (setCols:any,json:any) => {
    setCols(() => {
      const newCols:number[][] = [[], [], [], []];
      json?.map((v:any,i:number)=>{
      if((i+1)%3==1){
        newCols[0].push(v)
      }else if((i+1)%3==2){
        newCols[1].push(v)
      }else if((i+1)%3==0){
        newCols[2].push(v)
      }
    })
      return newCols; // Mengembalikan array kolom yang diperbarui
    });
  };