(function () {
  "use strict";

  var STORAGE_KEYS = {
    index: "flower_pro_index",
    score: "flower_pro_score",
    unlocked: "flower_pro_unlocked",
    sound: "flower_pro_soundEnabled"
  };

  var FLOWERS = [
    { id: "hoa-hong", name: "Hoa Hồng", emoji: "🌹", color: "đỏ, hồng, vàng", simpleHint: "Loài hoa này thường được tặng để nói lời yêu thương.", bloomFact: "Hoa hồng làm khu vườn như có một lời chào dịu dàng. Hoa có nhiều màu, từ đỏ rực rỡ đến hồng mềm mại. Mỗi bông hoa nhỏ như một món quà đẹp để bé gửi lời thương mến." },
    { id: "hoa-sen", name: "Hoa Sen", emoji: "🪷", color: "hồng, trắng", simpleHint: "Loài hoa này mọc dưới nước và rất quen thuộc với ao hồ Việt Nam.", bloomFact: "Hoa sen có thể vươn lên từ bùn mà vẫn sạch và đẹp. Cánh sen mềm, thơm nhẹ và tạo cảm giác bình yên. Vì vậy hoa sen là bông hoa rất đặc biệt trong lòng nhiều người Việt Nam." },
    { id: "hoa-mai", name: "Hoa Mai", emoji: "🌼", color: "vàng", simpleHint: "Loài hoa này thường nở vào mùa Tết ở miền Nam.", bloomFact: "Hoa mai vàng như nắng xuân nhỏ xinh. Khi mai nở, nhiều gia đình thấy Tết đã đến rất gần. Những cánh hoa vàng làm căn nhà sáng lên và vui hơn." },
    { id: "hoa-dao", name: "Hoa Đào", emoji: "🌸", color: "hồng", simpleHint: "Loài hoa này thường nở vào mùa Tết ở miền Bắc.", bloomFact: "Hoa đào có màu hồng ấm áp như lời chúc năm mới. Những cánh đào mỏng manh làm ngày Tết thêm mềm mại. Bé nhìn hoa đào có thể thấy mùa xuân đang ghé thăm." },
    { id: "hoa-cuc", name: "Hoa Cúc", emoji: "🌼", color: "vàng, trắng", simpleHint: "Loài hoa có nhiều cánh nhỏ xếp tròn như mặt trời mini.", bloomFact: "Hoa cúc trông như những mặt trời bé xíu trong vườn. Hoa có nhiều màu tươi sáng và rất dễ gặp. Một khóm cúc nở rộ có thể làm góc sân vui lên ngay." },
    { id: "hoa-huong-duong", name: "Hoa Hướng Dương", emoji: "🌻", color: "vàng", simpleHint: "Loài hoa này thường quay về phía mặt trời.", bloomFact: "Hoa hướng dương làm bé nhớ tới mặt trời nhỏ xinh. Bông hoa vàng rực thường hướng về ánh sáng. Cả cánh đồng hướng dương trông như có rất nhiều nụ cười đang tỏa nắng." },
    { id: "hoa-lan", name: "Hoa Lan", emoji: "🌺", color: "tím, trắng, vàng", simpleHint: "Loài hoa này có dáng thanh thoát và hay được trồng trong chậu treo.", bloomFact: "Hoa lan có vẻ đẹp nhẹ nhàng và sang trọng. Mỗi bông lan trông như đang mặc chiếc váy nhỏ xinh. Khi lan nở, góc nhà trở nên dịu dàng hơn." },
    { id: "hoa-ly", name: "Hoa Ly", emoji: "🌷", color: "trắng, hồng, vàng", simpleHint: "Loài hoa có bông lớn, mùi thơm và hay cắm trong bình.", bloomFact: "Hoa ly có bông lớn và hương thơm dễ nhận ra. Những cánh hoa xòe mở trông rất tự tin. Một bình hoa ly có thể làm căn phòng sáng và thơm hơn." },
    { id: "hoa-tulip", name: "Hoa Tulip", emoji: "🌷", color: "đỏ, vàng, tím", simpleHint: "Loài hoa có dáng như chiếc cốc nhỏ nhiều màu.", bloomFact: "Hoa tulip trông như những chiếc cốc màu sắc đứng trong vườn. Mỗi bông gọn gàng mà vẫn rất nổi bật. Khi nhiều bông tulip đứng cạnh nhau, khu vườn giống một hộp bút sáp khổng lồ." },
    { id: "hoa-dong-tien", name: "Hoa Đồng Tiền", emoji: "🌼", color: "cam, đỏ, vàng", simpleHint: "Loài hoa có bông tròn tươi, tên nghe như lời chúc may mắn.", bloomFact: "Hoa đồng tiền có khuôn mặt tròn và màu sắc rực rỡ. Tên hoa nghe vui như một lời chúc tốt lành. Bé nhìn thấy hoa này sẽ thấy ngay một cảm giác tươi mới." },
    { id: "hoa-phuong", name: "Hoa Phượng", emoji: "🌺", color: "đỏ", simpleHint: "Loài hoa đỏ rực thường gắn với sân trường mùa hè.", bloomFact: "Hoa phượng đỏ rực làm sân trường sáng bừng trong nắng hè. Cánh hoa mỏng nhưng cả chùm lại rất nổi bật. Nhiều bạn nhỏ thấy phượng là nhớ tới ngày hè vui vẻ." },
    { id: "hoa-sua", name: "Hoa Sữa", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa nhỏ màu trắng, có hương thơm rất dễ nhận ra trên phố.", bloomFact: "Hoa sữa nhỏ li ti nhưng mùi hương lại rất rõ. Khi hoa nở, cả góc phố như có một mùi thơm riêng. Bé có thể gặp hoa sữa trên những hàng cây quen thuộc." },
    { id: "hoa-nhai", name: "Hoa Nhài", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng nhỏ, thơm nhẹ và hay được trồng gần nhà.", bloomFact: "Hoa nhài bé xinh mà có hương thơm dịu. Những bông trắng nhỏ trông như các ngôi sao gần mặt đất. Một chậu hoa nhài có thể làm buổi chiều thêm êm ái." },
    { id: "hoa-dam-but", name: "Hoa Dâm Bụt", emoji: "🌺", color: "đỏ, hồng, vàng", simpleHint: "Loài hoa có cánh lớn, thường thấy ở hàng rào và sân nhà.", bloomFact: "Hoa dâm bụt có bông to và màu sắc nổi bật. Cánh hoa xòe rộng như đang chào bé. Loài hoa này làm hàng rào trông vui và rực rỡ hơn." },
    { id: "hoa-giay", name: "Hoa Giấy", emoji: "🌸", color: "hồng, tím, cam", simpleHint: "Loài hoa có cánh mỏng như giấy và thường leo thành giàn.", bloomFact: "Hoa giấy có cánh mỏng nhẹ như tên gọi của mình. Khi nở thành chùm, cả giàn hoa trông rất tươi. Dù nắng nhiều, hoa giấy vẫn có thể rực rỡ bên hiên nhà." },
    { id: "hoa-muoi-gio", name: "Hoa Mười Giờ", emoji: "🌺", color: "nhiều màu", simpleHint: "Loài hoa nhỏ thường nở đẹp khi có nắng.", bloomFact: "Hoa mười giờ có cái tên rất vui vì thường nở rực khi trời nắng. Những bông hoa nhỏ nhiều màu trông như các ngôi sao bé xíu. Bé có thể gặp hoa này trong nhiều khu vườn thân quen." },
    { id: "hoa-cam-tu-cau", name: "Hoa Cẩm Tú Cầu", emoji: "💠", color: "xanh, hồng, tím", simpleHint: "Loài hoa gồm nhiều bông nhỏ kết thành một quả cầu mềm.", bloomFact: "Hoa cẩm tú cầu trông như một quả bóng hoa tròn tròn. Nhiều bông nhỏ đứng sát nhau tạo thành một chùm thật mềm. Màu hoa có thể xanh, hồng hoặc tím, nhìn rất thích mắt." },
    { id: "hoa-oai-huong", name: "Hoa Oải Hương", emoji: "💜", color: "tím", simpleHint: "Loài hoa tím nhỏ, nổi tiếng với mùi thơm dịu dễ ngủ.", bloomFact: "Hoa oải hương có màu tím nhẹ và mùi thơm dễ chịu. Những cành hoa dài trông như nét vẽ mềm của khu vườn. Mùi hương của hoa làm nhiều người thấy bình yên." },
    { id: "hoa-mau-don", name: "Hoa Mẫu Đơn", emoji: "🌺", color: "hồng, đỏ, trắng", simpleHint: "Loài hoa có bông lớn, cánh dày và trông rất lộng lẫy.", bloomFact: "Hoa mẫu đơn nở lên trông đầy đặn và sáng đẹp. Cánh hoa xếp lớp như chiếc váy công chúa. Một bông mẫu đơn có thể làm cả góc vườn trở nên đặc biệt." },
    { id: "hoa-bo-cong-anh", name: "Hoa Bồ Công Anh", emoji: "🌼", color: "vàng, trắng", simpleHint: "Loài hoa có quả bông trắng nhẹ, gặp gió là bay đi.", bloomFact: "Hoa bồ công anh ban đầu vàng nhỏ, sau đó thành chùm bông trắng mềm. Khi gió thổi, những hạt nhỏ bay đi như lời ước. Bé nhìn thấy sẽ muốn khẽ thổi và ngắm chúng bay xa." },
    { id: "hoa-cam-chuong", name: "Hoa Cẩm Chướng", emoji: "🌸", color: "hồng, đỏ, trắng", simpleHint: "Loài hoa có cánh nhăn mềm và hay được tặng trong ngày đặc biệt.", bloomFact: "Hoa cẩm chướng có cánh mềm với viền cong cong đáng yêu. Bông hoa trông vừa dịu dàng vừa bền bỉ. Một bó cẩm chướng nhỏ có thể gửi đi nhiều lời yêu thương." },
    { id: "hoa-thuoc-duoc", name: "Hoa Thược Dược", emoji: "🌼", color: "đỏ, cam, vàng", simpleHint: "Loài hoa có nhiều cánh xếp tròn, bông dày và rất bắt mắt.", bloomFact: "Hoa thược dược có nhiều cánh xếp đều như bức tranh tròn. Màu hoa rực rỡ làm khu vườn thêm nhộn nhịp. Mỗi bông trông như một pháo hoa nhỏ đang đứng yên." },
    { id: "hoa-thuy-tien", name: "Hoa Thủy Tiên", emoji: "🌼", color: "trắng, vàng", simpleHint: "Loài hoa có dáng thanh mai, thường được ngắm cho nở dịp năm mới.", bloomFact: "Hoa thủy tiên có cánh trắng và nhụy vàng xinh xắn. Khi hoa nở, dáng hoa trông thanh thoát như đang múa. Nhiều nhà thích ngắm thủy tiên để đón những ngày vui." },
    { id: "hoa-loa-ken", name: "Hoa Loa Kèn", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng có dáng như chiếc loa nhỏ.", bloomFact: "Hoa loa kèn có dáng như chiếc kèn trắng đang mở. Bông hoa đơn giản mà rất trong trẻo. Khi cắm thành bó, hoa loa kèn làm mọi thứ trở nên nhẹ nhàng." },
    { id: "hoa-violet", name: "Hoa Violet", emoji: "💜", color: "tím", simpleHint: "Loài hoa nhỏ màu tím, nhìn dịu dàng và xinh xắn.", bloomFact: "Hoa violet nhỏ bé nhưng màu tím rất đáng nhớ. Những bông hoa thấp thoáng như điểm chấm màu trong cỏ. Bé tìm thấy violet sẽ thấy khu vườn có thêm bí mật nhỏ." },
    { id: "hoa-anh-dao", name: "Hoa Anh Đào", emoji: "🌸", color: "hồng nhạt", simpleHint: "Loài hoa hồng nhạt nở thành chùm, nổi tiếng trong mùa xuân.", bloomFact: "Hoa anh đào nở thành những đám mây hồng rất mềm. Khi cánh hoa rơi nhẹ, khung cảnh trông như một cơn mưa màu hồng. Loài hoa này làm nhiều người nghĩ tới mùa xuân dịu dàng." },
    { id: "hoa-baby", name: "Hoa Baby", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa rất nhỏ, thường dùng để điểm cho bó hoa thêm mềm.", bloomFact: "Hoa baby nhỏ li ti như hạt tuyết trắng. Đứng một mình thì dịu dàng, đứng cùng hoa khác lại làm bó hoa đẹp hơn. Những bông bé xíu này có sức làm mọi thứ trông mềm mại." },
    { id: "hoa-bat-tu", name: "Hoa Bất Tử", emoji: "🌼", color: "vàng, tím, hồng", simpleHint: "Loài hoa giữ màu khá lâu sau khi cắt khô.", bloomFact: "Hoa bất tử có cánh khô và giữ màu rất bền. Tên hoa nghe như một điều kỳ diệu nhỏ trong vườn. Bé có thể thấy hoa này trong những bó hoa khô xinh xắn." },
    { id: "hoa-thien-dieu", name: "Hoa Thiên Điểu", emoji: "🧡", color: "cam, xanh", simpleHint: "Loài hoa có dáng độc đáo như một cánh chim đang bay.", bloomFact: "Hoa thiên điểu có hình dáng rất lạ mắt. Màu cam và xanh làm bông hoa trông như dang cánh. Nhìn hoa này, bé có thể tưởng tượng khu vườn đang có một vũ điệu vui." },
    { id: "hoa-trang-nguyen", name: "Hoa Trạng Nguyên", emoji: "❤️", color: "đỏ", simpleHint: "Loài hoa đỏ rực thường xuất hiện vào dịp cuối năm.", bloomFact: "Hoa trạng nguyên có màu đỏ ấm áp và nổi bật. Những lá màu rực rỡ quanh bông hoa làm cây trông như đang mặc áo lễ hội. Đặt một chậu trong nhà, góc phòng liền sáng lên." },
    { id: "hoa-sung", name: "Hoa Súng", emoji: "🪷", color: "tím, hồng, trắng", simpleHint: "Loài hoa nở trên mặt nước, trông giống người bạn của hoa sen.", bloomFact: "Hoa súng nổi nhẹ trên mặt nước và xòe cánh rất đẹp. Bông hoa trông như đang soi mình dưới ao. Bé nhìn thấy hoa súng sẽ thấy mặt nước thêm sinh động." },
    { id: "hoa-tigon", name: "Hoa Tigon", emoji: "💕", color: "hồng", simpleHint: "Loài hoa leo có bông nhỏ màu hồng dáng trái tim.", bloomFact: "Hoa tigon nhỏ xinh và thường leo thành chùm. Nhiều bông có dáng như trái tim bé. Một giàn tigon làm lối đi vào nhà trông lãng mạn và vui mắt." },
    { id: "hoa-ngoc-lan", name: "Hoa Ngọc Lan", emoji: "🤍", color: "trắng, vàng nhạt", simpleHint: "Loài hoa thơm, cánh dài và thường nở trên cây thân gỗ.", bloomFact: "Hoa ngọc lan có hương thơm dịu và dáng hoa thanh. Cánh hoa dài ôm lấy nhau như một món quà nhỏ. Khi gió đưa mùi hoa tới, bé có thể thấy cả sân nhà dịu lại." },
    { id: "hoa-tra", name: "Hoa Trà", emoji: "🌺", color: "hồng, đỏ, trắng", simpleHint: "Loài hoa có cánh xếp lớp, nhìn gần giống bông hồng tròn đầy.", bloomFact: "Hoa trà có nhiều lớp cánh xếp gọn gàng. Bông hoa trông sang và êm như những lớp lụa màu. Cây hoa trà nở chậm rãi, làm bé muốn ngắm thật lâu." },
    { id: "hoa-do-quyen", name: "Hoa Đỗ Quyên", emoji: "🌸", color: "hồng, đỏ, trắng", simpleHint: "Loài hoa thường nở thành chùm trên bụi, màu sắc rất tươi.", bloomFact: "Hoa đỗ quyên nở thành chùm đầy màu sắc. Những bông hoa nhỏ đứng gần nhau làm bụi cây sáng bừng. Khi đỗ quyên nở, khu vườn trông nhộn nhịp hơn hẳn." },
    { id: "hoa-sim", name: "Hoa Sim", emoji: "💜", color: "tím", simpleHint: "Loài hoa tím nhỏ thường thấy ở đồi và ven rừng.", bloomFact: "Hoa sim có màu tím mộc mạc và nhẹ nhàng. Những bông hoa nhỏ làm đồi có thêm sắc màu. Bé nhìn hoa sim sẽ thấy vẻ đẹp đôi khi rất giản dị." },
    { id: "hoa-mua", name: "Hoa Mua", emoji: "💜", color: "tím", simpleHint: "Loài hoa tím mỏng manh, hay gặp ở những vùng đồi có nắng.", bloomFact: "Hoa mua có cánh tím mỏng và sáng. Bông hoa nhỏ nhưng khi nở nhiều lại làm cả góc đồi đẹp hơn. Màu tím của hoa mua trông rất hiền và thân thuộc." },
    { id: "hoa-bang-lang", name: "Hoa Bằng Lăng", emoji: "💜", color: "tím", simpleHint: "Loài hoa tím thường nở trên cây ven đường vào mùa hè.", bloomFact: "Hoa bằng lăng như những đám mây tím trên phố. Khi cây nở, cả con đường trông dịu mát hơn. Nhiều bạn nhỏ thấy bằng lăng là nhớ tới mùa hè và trường lớp." },
    { id: "hoa-loc-vung", name: "Hoa Lộc Vừng", emoji: "❤️", color: "đỏ", simpleHint: "Loài hoa có những sợi đỏ dài rủ xuống như rèm nhỏ.", bloomFact: "Hoa lộc vừng rủ thành những chùm đỏ rất lạ mắt. Những sợi hoa dài làm cây trông như đang đeo rèm lễ hội. Khi hoa rơi, mặt đất cũng có thêm màu đỏ vui vui." },
    { id: "hoa-ban", name: "Hoa Ban", emoji: "🤍", color: "trắng, tím nhạt", simpleHint: "Loài hoa đẹp của vùng núi, cánh mềm và thanh thoát.", bloomFact: "Hoa ban có vẻ đẹp trong trẻo của núi rừng. Cánh hoa trắng pha tím nhạt trông rất dịu. Khi hoa ban nở, nhiều con đường miền núi như được trang trí bằng mây." },
    { id: "hoa-gao", name: "Hoa Gạo", emoji: "❤️", color: "đỏ", simpleHint: "Loài hoa đỏ rực nở trên cây cao khi cành còn ít lá.", bloomFact: "Hoa gạo đỏ rực như những đốm lửa nhỏ trên cao. Khi cây gạo nở, bầu trời trông có thêm nhiều điểm màu. Loài hoa này làm cảnh quê trở nên rất đáng nhớ." },
    { id: "hoa-mong-bo", name: "Hoa Móng Bò", emoji: "🌸", color: "hồng, tím", simpleHint: "Loài hoa trên cây, cánh xòe mềm và thường thấy ven đường.", bloomFact: "Hoa móng bò có cánh xòe như những chiếc quạt mềm. Màu hồng tím làm con đường trông vui hơn. Những bông hoa trên cao như đang mỉm cười với bé." },
    { id: "hoa-hoang-yen", name: "Hoa Hoàng Yến", emoji: "💛", color: "vàng", simpleHint: "Loài hoa vàng rủ thành chùm dài trên cây.", bloomFact: "Hoa hoàng yến vàng tươi rủ xuống thành chùm. Khi nở nhiều, cây trông như đang mặc áo nắng. Bé đi ngang qua có thể thấy cả khoảng trời vàng lên." },
    { id: "hoa-quynh", name: "Hoa Quỳnh", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng thường nở về đêm và có hương thơm.", bloomFact: "Hoa quỳnh thường mở cánh khi đêm xuống. Bông hoa trắng lớn và thơm như một điều bất ngờ. Ai thức đúng lúc hoa nở sẽ thấy mình gặp một khoảnh khắc đặc biệt." },
    { id: "hoa-nguyet-que", name: "Hoa Nguyệt Quế", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng nhỏ, thơm, hay được trồng làm hàng cây xanh.", bloomFact: "Hoa nguyệt quế nhỏ trắng và rất thơm. Những chùm hoa bé xinh ẩn mình giữa lá xanh. Khi nở, cây như gửi một mùi hương nhẹ vào gió." },
    { id: "hoa-su-quan-tu", name: "Hoa Sử Quân Tử", emoji: "🌺", color: "đỏ, hồng, trắng", simpleHint: "Loài hoa leo, bông đổi màu từ trắng sang hồng đỏ.", bloomFact: "Hoa sử quân tử leo thành giàn và nở từng chùm. Điều vui là bông hoa có thể đổi màu khi lớn lên. Một giàn hoa này làm hiên nhà trông đầy sức sống." },
    { id: "hoa-sao-nhai", name: "Hoa Sao Nhái", emoji: "🌸", color: "hồng, trắng, cam", simpleHint: "Loài hoa cánh mỏng, thân cao, hay rung rinh trong gió.", bloomFact: "Hoa sao nhái có cánh mỏng và dáng hoa rất nhẹ. Khi gió thổi, bông hoa rung rinh như đang nhảy. Cả luống sao nhái làm khu vườn trông tự nhiên và vui vẻ." },
    { id: "hoa-da-quy", name: "Hoa Dã Quỳ", emoji: "🌼", color: "vàng", simpleHint: "Loài hoa vàng thường nở thành đồi rực rỡ vào cuối năm.", bloomFact: "Hoa dã quỳ vàng tươi như ánh nắng trên đồi. Khi nở nhiều, cả con đường có thể thành màu vàng rực. Bé nhìn thấy sẽ có cảm giác mùa đẹp đang đến." },
    { id: "hoa-cai-vang", name: "Hoa Cải Vàng", emoji: "💛", color: "vàng", simpleHint: "Loài hoa vàng nhỏ thường nở thành ruộng rất sáng.", bloomFact: "Hoa cải vàng nhỏ nhưng khi nở thành ruộng thì rất rực rỡ. Những bông hoa như những chấm nắng bé xíu. Đi qua ruộng hoa cải, bé sẽ thấy mắt mình cũng sáng lên." },
    { id: "hoa-lavender", name: "Hoa Lavender", emoji: "💜", color: "tím", simpleHint: "Loài hoa tím có mùi thơm dịu, còn gọi là oải hương.", bloomFact: "Hoa lavender có màu tím mềm và mùi hương rất dễ chịu. Những cành hoa dài tạo thành luống tím xinh xắn. Mùi hoa làm nhiều người nghĩ tới sự yên bình." },
    { id: "hoa-iris", name: "Hoa Iris", emoji: "💙", color: "tím, xanh", simpleHint: "Loài hoa có cánh cong mềm, màu tím xanh rất nổi bật.", bloomFact: "Hoa iris có dáng cánh lạ mắt như nét vẽ uốn lượn. Màu tím xanh làm bông hoa trông đặc biệt. Một bông iris có thể làm bé muốn nhìn gần hơn." },
    { id: "hoa-poppy", name: "Hoa Poppy", emoji: "❤️", color: "đỏ, cam", simpleHint: "Loài hoa có cánh mỏng như lụa, thường có màu đỏ tươi.", bloomFact: "Hoa poppy có cánh mỏng và màu đỏ nổi bật. Khi hoa rung trong gió, trông như những mảnh lụa nhỏ đang bay. Một cánh poppy làm đồng cỏ thêm rất nhiều sức sống." },
    { id: "hoa-forget-me-not", name: "Hoa Forget-me-not", emoji: "💙", color: "xanh", simpleHint: "Loài hoa xanh nhỏ, tên có nghĩa là đừng quên tôi.", bloomFact: "Hoa forget-me-not bé xíu và có màu xanh dịu. Tên hoa nghe như một lời nhắc đáng yêu. Những bông nhỏ này làm bé thấy điều đẹp không cần phải thật to." },
    { id: "hoa-cuc-hoa-mi", name: "Hoa Cúc Họa Mi", emoji: "🤍", color: "trắng, vàng", simpleHint: "Loài hoa nhỏ cánh trắng, nhụy vàng, trông rất trong trẻo.", bloomFact: "Hoa cúc họa mi có cánh trắng và tâm vàng nhỏ. Bông hoa giản dị nhưng khi nở nhiều lại rất đẹp. Một bó cúc họa mi làm ngày thu trông nhẹ hơn." },
    { id: "hoa-cuc-van-tho", name: "Hoa Cúc Vạn Thọ", emoji: "🧡", color: "vàng, cam", simpleHint: "Loài hoa vàng cam, thường xuất hiện trong nhiều dịp lễ Tết.", bloomFact: "Hoa cúc vạn thọ có màu vàng cam ấm áp. Bông hoa tròn đầy làm sân nhà thêm tươi. Vào dịp lễ Tết, loài hoa này thường mang lại cảm giác sum vầy." },
    { id: "hoa-sen-da", name: "Hoa Sen Đá", emoji: "🪴", color: "xanh, hồng nhạt", simpleHint: "Loài cây mọng nước có lá xếp như một bông hoa nhỏ.", bloomFact: "Hoa sen đá có lá xếp tròn như bông hoa bé xíu. Cây nhỏ gọn và sống bền, rất hợp để đặt trên bàn. Bé chạm nhẹ sẽ thấy lá dày và mát mát." },
    { id: "hoa-xuong-rong", name: "Hoa Xương Rồng", emoji: "🌵", color: "hồng, vàng, trắng", simpleHint: "Loài hoa nở trên cây có gai và chịu nắng giỏi.", bloomFact: "Hoa xương rồng là món quà bất ngờ trên cây gai góc. Dù cây sống ở nơi nắng, bông hoa vẫn có thể rất rực rỡ. Bé sẽ thấy mạnh mẽ cũng có thể nở hoa thật đẹp." },
    { id: "hoa-chuong-xanh", name: "Hoa Chuông Xanh", emoji: "💙", color: "xanh tím", simpleHint: "Loài hoa nhỏ có dáng như những chiếc chuông bé xinh.", bloomFact: "Hoa chuông xanh có dáng như những chiếc chuông nhỏ. Màu xanh tím làm góc vườn trông mát lành. Khi nhiều bông đứng cạnh nhau, bé như thấy một dàn chuông im lặng." },
    { id: "hoa-linh-lan", name: "Hoa Linh Lan", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng nhỏ rủ xuống như những hạt chuông tí hon.", bloomFact: "Hoa linh lan có những bông trắng nhỏ rủ xuống. Mỗi bông trông như hạt chuông bé xíu. Vẻ đẹp nho nhỏ ấy làm khu vườn thêm đáng yêu." },
    { id: "hoa-mimosa", name: "Hoa Mimosa", emoji: "💛", color: "vàng", simpleHint: "Loài hoa vàng nhỏ thành chùm bông mềm.", bloomFact: "Hoa mimosa trông như những cục bông vàng tí hon. Chùm hoa mềm làm bé muốn ngắm mãi. Màu vàng ấm áp của mimosa làm ngày lạnh cũng thấy vui hơn." },
    { id: "hoa-tuyet-mai", name: "Hoa Tuyết Mai", emoji: "🤍", color: "trắng", simpleHint: "Loài hoa trắng nhỏ nở đầy trên cành, thường được cắm dịp Tết.", bloomFact: "Hoa tuyết mai có nhiều bông trắng nhỏ trên cành mảnh. Khi nở đầy, cành hoa trông như phủ tuyết mềm. Đặt trong nhà, tuyết mai làm không gian sáng và thanh hơn." }
  ];

  var FLOWER_IMAGES = FLOWERS.reduce(function (images, flower) {
    images[flower.name] = "assets/flowers/" + flower.id.replace(/-/g, "_") + ".webp";
    return images;
  }, {});

  var FLOWER_WOW_FACTS = FLOWERS.reduce(function (facts, flower) {
    facts[flower.name] = flower.bloomFact;
    return facts;
  }, {});

  var state = {
    currentIndex: readNumber(STORAGE_KEYS.index, 0),
    score: readNumber(STORAGE_KEYS.score, 0),
    unlocked: readSet(STORAGE_KEYS.unlocked),
    soundEnabled: readBoolean(STORAGE_KEYS.sound, true),
    currentFlower: null,
    answered: false
  };

  var els = {
    progressText: document.getElementById("progressText"),
    scoreText: document.getElementById("scoreText"),
    soundToggle: document.getElementById("soundToggle"),
    bloomButton: document.getElementById("bloomButton"),
    bloomEmoji: document.getElementById("bloomEmoji"),
    tapCta: document.getElementById("tapCta"),
    stageHint: document.getElementById("stageHint"),
    questionPanel: document.getElementById("questionPanel"),
    hintText: document.getElementById("hintText"),
    answersGrid: document.getElementById("answersGrid"),
    feedbackText: document.getElementById("feedbackText"),
    resultPanel: document.getElementById("resultPanel"),
    flowerReveal: document.getElementById("flowerReveal"),
    resultName: document.getElementById("resultName"),
    resultFact: document.getElementById("resultFact"),
    nextButton: document.getElementById("nextButton"),
    collectionGrid: document.getElementById("collectionGrid"),
    resetButton: document.getElementById("resetButton")
  };

  els.bloomButton.addEventListener("click", startRound);
  els.nextButton.addEventListener("click", nextRound);
  els.soundToggle.addEventListener("click", toggleSound);
  els.resetButton.addEventListener("click", resetProgress);

  init();

  function init() {
    state.currentIndex = normalizeIndex(state.currentIndex);
    state.currentFlower = FLOWERS[state.currentIndex];
    renderHeader();
    renderCollection();
    resetStage();
  }

  function startRound() {
    if (state.answered) return;
    state.currentFlower = FLOWERS[state.currentIndex];
    els.bloomButton.classList.add("awake", "is-blooming", "burst");
    els.tapCta.textContent = "Nụ hoa đang thức dậy...";
    els.stageHint.textContent = "Bé xem gợi ý rồi chọn đáp án nhé.";
    playTone("tap");
    window.setTimeout(function () {
      els.bloomButton.classList.remove("awake", "is-blooming");
      showQuestion();
    }, 420);
  }

  function showQuestion() {
    var answers = makeAnswers(state.currentFlower);
    els.hintText.textContent = state.currentFlower.simpleHint;
    els.answersGrid.innerHTML = "";
    els.feedbackText.textContent = "";
    answers.forEach(function (flower) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = flower.name;
      button.addEventListener("click", function () {
        chooseAnswer(button, flower);
      });
      els.answersGrid.appendChild(button);
    });
    els.questionPanel.classList.remove("hidden");
    els.resultPanel.classList.add("hidden");
  }

  function chooseAnswer(button, flower) {
    if (state.answered) return;
    if (flower.id !== state.currentFlower.id) {
      button.classList.add("wrong");
      els.feedbackText.textContent = "Thử lại nhé, bông hoa sắp nở rồi!";
      playTone("wrong");
      return;
    }

    state.answered = true;
    button.classList.add("correct");
    state.unlocked.add(state.currentFlower.id);
    state.score += 1;
    saveProgress();
    renderHeader();
    renderCollection();
    playTone("correct");
    window.setTimeout(showResult, 260);
  }

  function showResult() {
    els.bloomButton.classList.add("revealed");
    els.bloomButton.classList.add("has-bloomed");
    els.bloomEmoji.textContent = state.currentFlower.emoji;
    els.tapCta.textContent = "Bé chọn đúng rồi! Bông hoa đã nở!";
    els.flowerReveal.innerHTML = "";
    var imagePath = FLOWER_IMAGES[state.currentFlower.name];
    var img = document.createElement("img");
    img.alt = state.currentFlower.name;
    img.src = imagePath;
    img.onerror = function () {
      els.flowerReveal.textContent = state.currentFlower.emoji;
    };
    els.flowerReveal.appendChild(img);
    els.resultName.textContent = state.currentFlower.name;
    els.resultFact.textContent = FLOWER_WOW_FACTS[state.currentFlower.name];
    els.resultPanel.classList.remove("hidden");
    els.resultPanel.classList.add("celebrate");
    els.questionPanel.classList.add("hidden");
  }

  function nextRound() {
    state.currentIndex = normalizeIndex(state.currentIndex + 1);
    state.answered = false;
    saveProgress();
    resetStage();
  }

  function resetStage() {
    state.currentFlower = FLOWERS[state.currentIndex];
    state.answered = false;
    els.bloomButton.classList.remove("awake", "is-blooming", "has-bloomed", "burst", "revealed");
    els.bloomEmoji.textContent = "🌱";
    els.tapCta.textContent = "Chạm vào nụ hoa";
    els.stageHint.textContent = "Một bông hoa bí mật đang chờ bé đánh thức.";
    els.questionPanel.classList.add("hidden");
    els.resultPanel.classList.add("hidden");
    els.resultPanel.classList.remove("celebrate");
    els.feedbackText.textContent = "";
  }

  function makeAnswers(correctFlower) {
    var pool = FLOWERS.filter(function (flower) {
      return flower.id !== correctFlower.id;
    });
    shuffle(pool);
    var answers = pool.slice(0, 3).concat(correctFlower);
    return shuffle(answers);
  }

  function renderHeader() {
    els.progressText.textContent = "Vườn hoa của bé: " + state.unlocked.size + "/" + FLOWERS.length;
    els.scoreText.textContent = "Điểm vui: " + state.score;
    els.soundToggle.textContent = state.soundEnabled ? "Âm" : "Tắt";
    els.soundToggle.setAttribute("aria-pressed", String(state.soundEnabled));
  }

  function renderCollection() {
    els.collectionGrid.innerHTML = "";
    FLOWERS.forEach(function (flower, index) {
      var unlocked = state.unlocked.has(flower.id);
      var item = document.createElement("article");
      item.className = "collection-item" + (unlocked ? "" : " locked");
      var emoji = document.createElement("div");
      emoji.className = "collection-emoji";
      emoji.textContent = unlocked ? flower.emoji : "✦";
      var name = document.createElement("p");
      name.className = "collection-name";
      name.textContent = unlocked ? flower.name : "Bông hoa " + (index + 1);
      item.appendChild(emoji);
      item.appendChild(name);
      els.collectionGrid.appendChild(item);
    });
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem(STORAGE_KEYS.sound, JSON.stringify(state.soundEnabled));
    renderHeader();
    if (state.soundEnabled) playTone("tap");
  }

  function resetProgress() {
    var ok = window.confirm("Bé có muốn gieo lại khu vườn từ đầu không?");
    if (!ok) return;
    state.currentIndex = 0;
    state.score = 0;
    state.unlocked = new Set();
    state.answered = false;
    saveProgress();
    init();
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEYS.index, String(state.currentIndex));
    localStorage.setItem(STORAGE_KEYS.score, String(state.score));
    localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(Array.from(state.unlocked)));
  }

  function readNumber(key, fallback) {
    var value = Number(localStorage.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  }

  function readBoolean(key, fallback) {
    var raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try {
      return Boolean(JSON.parse(raw));
    } catch (error) {
      return fallback;
    }
  }

  function readSet(key) {
    try {
      var values = JSON.parse(localStorage.getItem(key) || "[]");
      return new Set(Array.isArray(values) ? values : []);
    } catch (error) {
      return new Set();
    }
  }

  function normalizeIndex(index) {
    if (!Number.isFinite(index) || index < 0) return 0;
    return index % FLOWERS.length;
  }

  function shuffle(items) {
    for (var i = items.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
    return items;
  }

  function playTone(type) {
    if (!state.soundEnabled || !window.AudioContext && !window.webkitAudioContext) return;
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    var context = new AudioCtor();
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    var now = context.currentTime;
    var settings = {
      tap: [520, 0.07, "sine"],
      wrong: [220, 0.11, "triangle"],
      correct: [740, 0.16, "sine"]
    }[type] || [420, 0.08, "sine"];

    oscillator.type = settings[2];
    oscillator.frequency.setValueAtTime(settings[0], now);
    if (type === "correct") {
      oscillator.frequency.exponentialRampToValueAtTime(980, now + settings[1]);
    }
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings[1]);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + settings[1] + 0.02);
    oscillator.onended = function () {
      context.close();
    };
  }
})();
