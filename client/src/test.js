function power(x,n){
  if(n===0) return 1
  else{
    console.log(n)
    return x*power(x,n-1)
  }
}

console.log(power(4,3))