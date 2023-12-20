// 現在のunixtime(秒単位)を取得
export const currUnixtime = () => Math.floor(new Date().getTime() / 1000);

// 1番目のコマンドライン引数を取得
export const getCliArg = (errMsg: any) => {
  if (process.argv.length <= 2) {
    console.error(errMsg);
    process.exit(1);
  }
  return process.argv[2];
};

module.exports = {
  currUnixtime,
  getCliArg,
};