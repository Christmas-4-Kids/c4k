import React, { useEffect, useState } from "react"
import { TouchableOpacity, Image, View } from "react-native"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"
import { SearchFilters } from "../types"
import ChaperoneSearchCard from "../components/ChaperoneSearchCard"
import { syncMailchimpVolunteers, updateVolunteerCheckedIn } from "../services/firestore.service"
import ChaperoneListCard from "../components/ChaperoneListCard"
import { useVolunteers, Volunteer } from "../context/volunteer.context"
import { C4kText } from "../components/C4kText"

import { NavigationProp } from "@react-navigation/native"

const checkedin = [
  '88b0276e36b3ce48c01e721f5f958dee', 'e7cf889d676ba21005d0d6eb48f97c3f', '7968584eacbd72e18d1bbb94944aa278', '6f548fde0fe73f0021dc6aa518cb5cdb', 'da303422ac13d40a9177b2deaf585705', 'd1e3394a31d19c70f604313f3e4cc0c2', '0f91806c857f9314df9e254e9e4bca37', 'e65e7db2dfc419bcd06f1af5ea5407f8', '83c0b55a4e7555bff76985745f1e2992', '9e978af62c80364bbb12a6c6bd29c1a5', '3bf71efcf6e658f8942de7e76d4ed1f2', '6f548fde0fe73f0021dc6aa518cb5cdb', '656555fa5ed5503605895b796b79a6c8', '27fce04af0af5fe6aa8905fc6f21a9d6', '7ecb7a3f4940e2a47a6af0eae58223aa', 'a12192cba447d889c68771c9129bf444', '7bb1697b2934c8b79bee6790aaf50fc2', '6315ae7fd583aa435b8cc3ca03e44ff0', '157b19272b8e1786d7ddbb01eab35c01', '0da023aa5dc9b85d309892aa6ad32d32', '68cce343e34fa24d76df41731715f009', '56c6cb0f0130542767393390cb768388', '9f309091e57e38112e53147706e43df2', 'd78c5b5ad03aae5f235c921153b1b625', '911044b94a56477b30bed1a31493a2d5', '7847d7c2ab1f27a869f3c491d3fd1bc3', '920ea8f666eff19dcb4446f69759c07f', '96df218e9bebbf9f499a25a7f9c41ae5', '54c04220391d04eb915ecfacd3701760', 'd6a80c455e5f8622ac35362a993473ee', '48d46a8fe6e7b2c6342e43c5334c8d21', 'b8adcab6aefcbd5a0fea3f922da799ba', 'eee9abd17f67c28f81af24675a0de924', '66c387f9c13f46d79f5aa12bd14b8e17', '4882e56f0b769cfecebf344bfb6ca360', '0273d4554a832900f726b1ead9954c22', '0f3022f7d59200785a937deac02328b8', '571b111fb9dd691255a476c482a9e197', '571b111fb9dd691255a476c482a9e197', '571b111fb9dd691255a476c482a9e197', 'a90207ba7323fe3eec28156349f90b83', 'd4f37c4679f1687b5341e75f752158a3', 'e7cf889d676ba21005d0d6eb48f97c3f', '7bb82b7454937adf0951d222c30192ce', '2fe6c7d950f77c3b3c57d5cb48831059', 'ac6c5fd1949e5f03171ca974d950ab08', '4ac379119acb2fdbc59e9cf68d1b6332', '98a30d137432efc66b50e8a81b662821', 'd3fd9622b9fe0ad943c4a689ce93fcec', 'd3fd9622b9fe0ad943c4a689ce93fcec', 'd3fd9622b9fe0ad943c4a689ce93fcec', '3e846dbfe6c560f48db27e5ef892f8e6', '7b366096ea90b90eb4915ecc11d5e678', '915bedd849a56d139f77f834dd73c936', 'c0b57b7fb433cbabae4e72d4e7dc0aff', 'b49ad84710f3075439352ec22f0d977f', '9f690e08136269e62707efac74da3bcd', '625700d0552f05a4d214f9a2a0277a26', 'fcb88d847acb7c00e95a9f05a3ac7489', '8e89520fd44829d13ab16af0e31c7211', '4fbd52a9c5f60104c1232e578bf27e1d', 'd027a06b05d839a6acb81499319b7034', '97bb634639fb1597ab4babb8517f6cbf', 'ae9722d72fa54523596264883ced9ac5', '77e3c5d41d7adad3b9c49d934731bcda', '4b5c3f979501a862126e0df8fb65f48c', '5d1a7b8dbb3ae3c65f99bff066f89f37', 'ecd05cbc78c87d89bb43b5767ed30236', 'bb7cb2fff4f74936895934c4390bf56d', '80da24742a87e860316ea3fd5535e400', 'f113172404d9432bdc34b3d5d1d4a40b', '1388d090059710ba971fbdd086eade04', 'e3dccd6778933197e1b420a80ea34417', 'f0ba59a99c508d9ef6313e6ce032cf93', '0d11b5900b2ac66450fc72468d460da8', 'ab13f19a3218fc2b93f75427c166b199', '240460e7f753fffbf0970e1dcd23bf1c', '26e7a9d91036feeb0cad9bfafb658e0d', '649f1ab1db4e5f3b5b666da774882cc4', '9acd25703f690a5081852b31acb93c9c', 'b2f7fdf8ea0d1840754a3217764b2543', '7acf443cd22c8f87b09af076d8975f7a', '609fba34cc8dc71b1656c6a55c594e57', '43c1a8a0226e5dd73a31ae793700bad5', '49dd66f00e608e825a7e58f09abb64af', '548179a35c1e643b44ba9b7f562c2256', '8d28c9a9bcabf341336f3ecb9f074272', 'a6466616977b30bf40a964726b7816d9', '75d5407957749e76ba3c514b53b57661', '94eb451bce4a494104f2ceba6e81bcf9', 'c4873c62cf8adc6d08d5d6a02737ed7f', 'bcbc265a747e041eb5d4c7922e550de1', '8f11b520ef249f18f597081894856efb', '48175935595b5e724e6ffbbe42253155', '8f460b67b3d5410b9d334200efb86a47', '33ecffd861af11411904abf729288240', '6e916cd4639c365ca8cf22cad0c8e82f', '38f2f81c990892216e6eb6895d2ded18', '9358c61c75199da498ed3528b9ddd098', 'be360f53223980cd1268e474958f6104', '0315a56144f880e42f793b03c44c5a33', 'ac093ed45c63a835c6667506dd531d61', '79da4db892975eb3b118a22ca96e3b7a', '2762cfa5d6f5e9426a9fb30770313b73', 'c232d23a06423fab12397659ca3e44b9', 'a26e5e7940099bb013d46c1ce3f36cdf', 'bcf8040723a51f1559574b47f84778e2', '6dcf9914f19a0d7a45205819b60737ca', 'e6198056e2fa8e2f636d5939b4cdcc7a', '88b0276e36b3ce48c01e721f5f958dee', '8495977053738b31c99ea53c6536db83', 'a26e5e7940099bb013d46c1ce3f36cdf', 'c3483945662c0f2b807e418ddb20793e', '8e0e149cd0d9664f8b527ab6598dc84f', 'ac2bd7aa9777ff909b4b2645f7001d2d', 'c2dc017b719568c7b48032e24a084e7b', '34acbfe5e7290cff537607b7d865e3cf', 'ef8aa41f44998bae5c57909a04d37338', '6fce837a6d7eb5aaea9b579e561348a8', '2a622a2e85c1d49b2f350f1d9da3c676', 'e0f25bd7c9bcc136f297ac548d0a8006', 'b1bac036e221df937cf94de0114b1c9a', '5a8ca5768018954f68e60c50bb01624b', '4d4a571afae9d95210998dc4b83bc63e', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', 'bb6565e27b5a1ffe9de759df7cd29f6c', '7345e651110e48bd0ac1400ce3175732', '7345e651110e48bd0ac1400ce3175732', '2c600f537a486772ad845de5d997f189', '65564bb2a174f36d8e667fbb2c4680a2', '375f1d2072aae28abd48ec9bf8eec970', '142cf4a51df99c47c70fa5c6b39b0379', 'edda0805f2155c3ebadbfc0b23d0100e', 'b975cd14dfd5ee778e0310c02c49dc7a', '999743546073359a68e16d354229be0c', 'e38438d80862de4e76d975aacc5427d7', 'daf95c33311eb658e7969cda9dceedf5', '4006f3c7e6503672cdaf05e7f4b01684', '558f6074b0940ef4b484acaeb8f792cb', 'a46425d95da79c05d49bde6c95917877', '8799220f55e71d380cd70dcb34b40cb6', 'c2568a2de00d3c0fbab198101d504fe1', 'bdeb90d14019a96220280256e7a5373f', 'c72876b5a2654e569c3e79d3a225055e', 'c2568a2de00d3c0fbab198101d504fe1', 'c2568a2de00d3c0fbab198101d504fe1', 'c2568a2de00d3c0fbab198101d504fe1', 'c2568a2de00d3c0fbab198101d504fe1', 'c2568a2de00d3c0fbab198101d504fe1', 'c2568a2de00d3c0fbab198101d504fe1', 'bdeb90d14019a96220280256e7a5373f', 'bdeb90d14019a96220280256e7a5373f', '7c534445502ba1ecf0ec304509f3a105', 'bdeb90d14019a96220280256e7a5373f', 'bdeb90d14019a96220280256e7a5373f', 'bdeb90d14019a96220280256e7a5373f', 'bdeb90d14019a96220280256e7a5373f', 'bdeb90d14019a96220280256e7a5373f', '87c6d40f807d4700433cee1f3a92258d', 'a63bc8b152cc7704ea7d5c1164f0e7b7', '1f799fe52ee17f70508749bc89d2ee00', '2334a02648dc18d2b5c4c9a6ffeea788', '366d20725ca2acee83a1e91b3e6d3266', '1f67343db4fd5fcd8a2b1af7fb54fd18', '15ac61eadf1ee0d9035f5c6f48d9e151', '88570fc8c5cbb1796a02d8404ba9fd3c', '7a74d1e4a060b870cd4fc160ac528ab0', '19a68818210a108a103c305d13afcf02', 'a72b70fce08171c42907041e6a4827a3', '17deba9a162cf8e9011cec9b9dfcb5b7', '30073318e371578f922114b3844f9abe', 'da7a13f2b3c1f17f54315804e47db1f1', '9cc088a6b33681c65a824e169abea001', '41913aeb443a2618665a34f644f54aed', 'd44ba98410b3e65ff2d537cb3e328da8', '4a94a0b03b36532e523d4ad03d71a2b1', '293125d0ac05b810615d7961bdfedcdd', '293125d0ac05b810615d7961bdfedcdd', '293125d0ac05b810615d7961bdfedcdd', 'ac97bb3d40d42c6520a770796b5af466', '5cba93272ce80e339ddb4eed550a9895', '8caef748be82f70b063a9631ed735072', '7d8a4f741ef3777e5b8326cf85bd2a1f', '7968584eacbd72e18d1bbb94944aa278', '133351731358c52ee1aab529bbba4f1c', 'eeaccc78ee8a1396a3170539f232ad89', 'd4954735711148a7f2aa8cd97144b359', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', '40b28da7cbbf3289e3f37cf57a2f4930', 'de0716bfd4e1407d09be29b11a0e66b2', 'de0716bfd4e1407d09be29b11a0e66b2'
]

export const ChaperoneList = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { styles } = useStyles()
  const { volunteers } = useVolunteers()
  const [searchName, setSearchName] = useState("")
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    lebanon: false,
    evening: false,
    allDay: false,
    sunday: false,
    admin: false,
    driver: false,
    checkedIn: false,
    notCheckedIn: false,
    espanol: false,
    medical: false,
  })
  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers)
  const onSyncPress = async () => {
    await syncMailchimpVolunteers()
  }

  const filterVolunteerType = (volunteerType: string, searchFilters: SearchFilters) => {
    const volunteerTypesToFilter = []
    const useChaperoneFilters = searchFilters.allDay || searchFilters.evening || searchFilters.lebanon || searchFilters.sunday || searchFilters.admin || searchFilters.driver
    if (!useChaperoneFilters) return true

    if (searchFilters.allDay) {
      volunteerTypesToFilter.push("2024_ALL_DAY_CHAPERONE")
    }
    if (searchFilters.evening) {
      volunteerTypesToFilter.push("2024_EVENING_CHAPERONE")
    }
    if (searchFilters.lebanon) {
      volunteerTypesToFilter.push("2024_LEBANON_CHAPERONE")
    }
    if (searchFilters.sunday) {
      volunteerTypesToFilter.push("2024_SUNDAY_CHAPERONE")
    }
    if (searchFilters.admin) {
      volunteerTypesToFilter.push("2024_ADMIN")
    }
    if (searchFilters.driver) {
      volunteerTypesToFilter.push("2024_DRIVER")
    }
    return volunteerTypesToFilter.includes(volunteerType)
  }

  const filterCheckedIn = (checkedIn: boolean, searchFilters: SearchFilters) => {
    const seeCheckedIn = searchFilters.checkedIn
    const seeNotCheckedIn = searchFilters.notCheckedIn
    if (seeCheckedIn && seeNotCheckedIn) {
      return true
    } else if (seeCheckedIn && !seeNotCheckedIn) {
      return checkedIn ? true : false
    } else if (!seeCheckedIn && seeNotCheckedIn) {
      return checkedIn ? false : true
    }
    return true
  }

  const filterOther = (volunteer: Volunteer, searchFilters: SearchFilters) => {
    const isMedical = volunteer.medical !== "None"
    const isSpanish = volunteer.spanish === "Yes"
    const seeMedical = searchFilters.medical
    const seeSpanish = searchFilters.espanol

    if (seeMedical && seeSpanish) {
      return isMedical && isSpanish
    } else if (seeMedical && !seeSpanish) {
      return isMedical
    } else if (!seeMedical && seeSpanish) {
      return isSpanish
    }
    return true
  }

  useEffect(() => {
    const newFilteredVolunteers = volunteers.filter((v) => {
      const useSearch = searchName.length >= 2
      if (useSearch) {
        return (
          filterVolunteerType(v.volunteerType, searchFilters) && filterCheckedIn(v.checkedIn, searchFilters) && filterOther(v, searchFilters) && v.fullName.includes(searchName)
        )
      } else {
        return filterVolunteerType(v.volunteerType, searchFilters) && filterCheckedIn(v.checkedIn, searchFilters) && filterOther(v, searchFilters)
      }
    })
    setFilteredVolunteers(newFilteredVolunteers)
  }, [
    searchName,
    searchFilters.admin,
    searchFilters.allDay,
    searchFilters.checkedIn,
    searchFilters.driver,
    searchFilters.espanol,
    searchFilters.evening,
    searchFilters.lebanon,
    searchFilters.sunday,
    searchFilters.medical,
    searchFilters.notCheckedIn,
    volunteers,
  ])
  const checkIn = () => {
    checkedin.forEach(async (id) => {
      const data = { checkedIn: true, refId: id }
      await updateVolunteerCheckedIn(data)
    })
  }
  return (
    <View style={styles.page}>
      <View style={styles.stickyHeader}></View>
      <ChaperoneSearchCard searchName={searchName} setSearchName={setSearchName} searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <View style={{ paddingHorizontal: 35, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={onSyncPress}>
          <View style={styles.upcomingEventButton}>
            <C4kText style={styles.upcomingEventButtonText}>Sync</C4kText>
          </View>
        </TouchableOpacity>
        <C4kText style={styles.searchResultCountText}>
          {filteredVolunteers.length} OF {volunteers.length}
        </C4kText>
        <TouchableOpacity onPress={() => checkIn()}>
          <View style={styles.upcomingEventButton}>
            <C4kText style={styles.upcomingEventButtonText}>Scan</C4kText>
          </View>
        </TouchableOpacity>
      </View>
      <ChaperoneListCard volunteers={filteredVolunteers} />
    </View>
  )
}
