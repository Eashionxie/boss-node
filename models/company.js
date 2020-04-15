import mongoose from './db'
const Schema = mongoose.Schema

const companySchema = new Schema({
  companyName: String,
  financingType: Number, // 融资情况：0 不需要融资；1 未融资；2 A轮；3 B轮；4 C轮；5 D轮及以上；6 已上市
  companySize: Number, // 公司规模：0 1-19人；1 20-99人；2 100-499人；3 500-999人；4 1000-9999人；5 10000人以上 
  companyType: String,
  companyShortDuce: String, // 简简介
  companyIntroduction: String, // 简介
  welfares: [], // 福利
  companyAvatar: String,
  companyAlbum: [
    {
      url: String,
      dec: String,
      createTime: {
        type: Date,
        default: Date.now
      }
    }
  ],
  companyAdress: {
      addressName: String,
      fullAddress: String,
      shortAddress: String,
      latlng: {
        latitude: String,
        longitude: String
      },
      country: String,
      province: String,
      city: String,
      area: String,
      street: String,
      building: String,
      No: String
  },
  established: Number,
  registeredCapital: Number, // 注册资金（单位万元）
  legalRepresentative: String, // 法人代表
  officeWeb: String,
  products: [
    {
      logo: String,
      name: String,
      dec: String,
      introduction: String
    }
  ],
  managers: [
    {
      avatar: String,
      name: String,
      post: String,
      introduction: String
    }
  ]
})

const CompanyModel = mongoose.model('Company', companySchema)
export default CompanyModel