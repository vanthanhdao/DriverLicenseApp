import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const TrickPass = () => {
    const [slot1, setslot1] = useState(0)
    const [slot2, setslot2] = useState(0)
    const [slot3, setslot3] = useState(0)
    const [slot4, setslot4] = useState(0)
    const [slot5, setslot5] = useState(0)
    const [slot6, setslot6] = useState(0)
    const [slot7, setslot7] = useState(0)
    const [slot8, setslot8] = useState(0)
    const [slot9, setslot9] = useState(0)
    const [slot10, setslot10] = useState(0)
    const [slot11, setslot11] = useState(0)
    const [slot12, setslot12] = useState(0)
    const [slot13, setslot13] = useState(0)
    const [slot14, setslot14] = useState(0)
    const [slot15, setslot15] = useState(0)
    const [slot16, setslot16] = useState(0)
    const [slot17, setslot17] = useState(0)
    const [slot18, setslot18] = useState(0)
    const [slot19, setslot19] = useState(0)
    const [slot20, setslot20] = useState(0)
    const [slot21, setslot21] = useState(0)
    const [slot22, setslot22] = useState(0)
    const [slot23, setslot23] = useState(0)
    const [slot24, setslot24] = useState(0)

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <ScrollView style={{ felx: 1 }}>
                <View style={{ flex: 1, margin: 5 }}>
                    <View style={{ height: slot1 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot1 === 0 ? 40 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot1 === 0 ? setslot1(1) : setslot1(0)}>
                            <Text style={styles.title}>Cấp phép</Text>
                            {slot1 === 0 ? null :
                                <Text style={styles.text}>- Đường cấm dừng, cấm đỗ, cấm đi do UBND cấp tỉnh cấp {'\n'}
                                    - Xe quá khổ, quá tải do: cơ quan quản lý đường bộ có thẩm quyền cấp phép
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot2 === 0 ? 50 : 100, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot2 === 0 ? 40 : 100, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot2 === 0 ? setslot2(1) : setslot2(0)}>
                            <Text style={styles.title}>Nồng độ cồn</Text>
                            {slot2 === 0 ? null :
                                <Text style={styles.text}>- Người điều khiển xe mô tô, ô tô, máy kéo trên đường mà {'\n'} trong máu hoặc hơi thở có nồng độ cồn: Bị nghiêm cấm
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot3 === 0 ? 50 : 160, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot3 === 0 ? 50 : 160, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot3 === 0 ? setslot3(1) : setslot3(0)}>
                            <Text style={styles.title}>Khoảng cách an toàn tối thiểu</Text>
                            {slot3 === 0 ? null :
                                <Text style={styles.text}>
                                    {[
                                        '- 35m nếu vận tốc lưu hành (V) = 60 (km/h)',
                                        '- 55m nếu 60 < (V) ≤ 80',
                                        '- 70m nếu 80 < (V) ≤ 100',
                                        '- 100m nếu 100 < (V) ≤ 120',
                                        '- Dưới 60km/h: Chủ động và đảm bảo khoảng cách',
                                    ].map((line, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && '\n'} {/* Xuống hàng giữa các dòng (không cần nếu chỉ có 1 dòng) */}
                                            {line}
                                        </React.Fragment>
                                    ))}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot4 === 0 ? 50 : 210, width: '100%', borderRadius: 8, borderLeftColor: 'orange', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot4 === 0 ? 50 : 210, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot4 === 0 ? setslot4(1) : setslot4(0)}>
                            <Text style={styles.title}>Hỏi về tuổi (T)</Text>
                            {slot4 === 0 ? null :
                                <Text style={styles.text}>- Tuổi tối đa hạng E: nam 55, nữ 50{'\n'}
                                    - Tuổi lấy bằng lái xe (cách nhau 3 tuổi){'\n'}
                                    - Gắn máy: 16T (dưới 50cm3){'\n'}
                                    - Mô tô + B1+B2: 18T{'\n'}
                                    - C, FB: 21T{'\n'}
                                    - D, FC: 24T{'\n'}
                                    - E, FD: 27T{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot5 === 0 ? 80 : 230, width: '100%', borderRadius: 8, borderLeftColor: 'purple', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot5 === 0 ? 80 : 230, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot5 === 0 ? setslot5(1) : setslot5(0)}>
                            <Text style={styles.title}>Trên đường cao tốc, trong đường hầm,{'\n'} đường vòng, đầu dốc, nơi tầm nhìn hạn chế</Text>
                            {slot5 === 0 ? null :
                                <Text style={styles.text}>- Không được quay đầu xe, không lùi, không vượt.{'\n'}
                                    - Không được vượt trên cầu hẹp có một làn xe.{'\n'}
                                    - Không được phép quay đầu xe ở phần đường dành cho người đi bộ qua đường.{'\n'}
                                    - Cẩm lùi xe ở khu vực cầm dừng và nơi đường bộ giao nhau.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot6 === 0 ? 50 : 100, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 5 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot6 === 0 ? 50 : 100, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot6 === 0 ? setslot6(1) : setslot6(0)}>
                            <Text style={styles.title}>Tại nơi giao nhau không có tín hiệu đèn</Text>
                            {slot6 === 0 ? null :
                                <Text style={styles.text}>- Có vòng xuyến: Nhường đường bên trái.{'\n'}
                                    - Không có vòng xuyến nhường bên phải
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot7 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot7 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot7 === 0 ? setslot7(1) : setslot7(0)}>
                            <Text style={styles.title}>Niên hạn sử dụng (tính từ năm sx)</Text>
                            {slot7 === 0 ? null :
                                <Text style={styles.text}>
                                    - 25 năm: ô tô tải.{'\n'}
                                    - 20 năm: ô tô chở người trên 9 chỗ.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot8 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot8 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot8 === 0 ? setslot8(1) : setslot8(0)}>
                            <Text style={styles.title}>Biển báo cấm</Text>
                            {slot8 === 0 ? null :
                                <Text style={styles.text}>{['- Cấm ô tô (Gồm: mô tô 3 bánh, Xe Lam, xe khách) --> Cẩm xe tải --> Cầm Máy kéo --> Cầm rơ moóc, sơ mi rơ moóc']}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot9 === 0 ? 50 : 220, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot9 === 0 ? 40 : 220, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot9 === 0 ? setslot9(1) : setslot9(0)}>
                            <Text style={styles.title}>Nhất chớm, nhì ưu, tam đường, tứ hướng</Text>
                            {slot9 === 0 ? null :
                                <Text style={styles.text}>1. Nhất chớm: Xe nào chớm tới vạch trước thì được đi trước.{'\n'}
                                    2. Nhì ưu: Xe ưu tiên được đi trước. Thứ tự xe ưu tiên: Hỏa-Sự-An-Thương (Cứu hòa - Quân sự - Công an - Cứu thương - Hộ đê - Đoàn xe tang).{'\n'}
                                    3. Tam đường: Xe ở đường chính, đường ưu tiên.{'\n'}
                                    4. Tứ hưởng: Thứ tự hướng: Bên phải trồng - Rẽ phải - Đi thẳng - Rẽ trái.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot10 === 0 ? 80 : 180, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot10 === 0 ? 80 : 180, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot10 === 0 ? setslot10(1) : setslot10(0)}>
                            <Text style={styles.title}>Thứ tự ưu tiên với xe ưu tiên: Hòa-Sự-An-Thương</Text>
                            {slot10 === 0 ? null :
                                <Text style={styles.text}>- Hỏa: Xe Cứu hỏa
                                    - Sự : Xe Quân sự.{'\n'}
                                    - An: Xe Công an.{'\n'}
                                    - Thương: Xe cứu thương.{'\n'}
                                    - Xe hộ đề, xe đi làm nhiệm vụ khẩn cấp.{'\n'}
                                    - Đoàn xe tang.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot11 === 0 ? 50 : 160, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot11 === 0 ? 50 : 160, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot11 === 0 ? setslot11(1) : setslot11(0)}>
                            <Text style={styles.title}>Các hạng GPLX</Text>
                            {slot11 === 0 ? null :
                                <Text style={styles.text}>
                                    - A1 mô tô dưới 175 cm3 và xe 3 bánh của người khuyết tật.{'\n'}
                                    - A2 mô tô 175 cm3 trở lên.{'\n'}
                                    - A3 xe mô tô 3 bánh.{'\n'}
                                    - B1 không hành nghề lái xe.{'\n'}
                                    - B1, B2 đến 9 chỗ ngồi, xe tải dưới 3.500kg.{'\n'}
                                    - C đến 9 chỗ ngồi, xe trên 3.500kg.{'\n'}
                                    - D chở đến 30 người.{'\n'}
                                    - E chở trên 30 người..{'\n'}
                                    - FC: C + kéo (ô tô đầu kéo, kéo sơ mi rơ moóc).{'\n'}
                                    - FE: E + kéo (ô tô chở khách nối toa).{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot12 === 0 ? 50 : 190, width: '100%', borderRadius: 8, borderLeftColor: 'orange', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot12 === 0 ? 50 : 190, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot12 === 0 ? setslot12(1) : setslot12(0)}>
                            <Text style={styles.title}>Phân nhóm biển báo hiệu: bao gồm</Text>
                            {slot12 === 0 ? null :
                                <Text style={styles.text}>
                                - Biển nguy hiểm (hình tam giác vàng).{'\n'}
                                - Biển cầm (vòng tròn đỏ).{'\n'}
                                - Biển hiệu lệnh (vòng tròn xanh).{'\n'}
                                - Biển chỉ dẫn (vuông hoặc hình chữ nhật xanh) Biển phụ (vuông, chữ nhật trắng đen): Hiệu lực{'\n'}
                                nằm ở biển phụ khi có đặt biền phụ
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot13 === 0 ? 60 : 150, width: '100%', borderRadius: 8, borderLeftColor: 'purple', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot13 === 0 ? 60 : 150, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot13 === 0 ? setslot13(1) : setslot13(0)}>
                            <Text style={styles.title}>Tốc độ tối đa trong khu vực đông dân cư</Text>
                            {slot13 === 0 ? null :
                                <Text style={styles.text}>- 60km/h: Đối với đường đôi hoặc đường 1 chiều có từ 2 làn xe cơ giới trở lên.{'\n'} 
                                    - 50km/h: Đối với đường 2 chiều hoặc đường 1 chiều có 1 làn xe cơ giới
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot14 === 0 ? 50 : 100, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 5 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot14 === 0 ? 50 : 100, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot14 === 0 ? setslot14(1) : setslot14(0)}>
                            <Text style={styles.title}>Tại nơi giao nhau không có tín hiệu đèn</Text>
                            {slot14 === 0 ? null :
                                <Text style={styles.text}>- Có vòng xuyến: Nhường đường bên trái.{'\n'}
                                    - Không có vòng xuyến nhường bên phải
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot15 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot15 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot15 === 0 ? setslot15(1) : setslot15(0)}>
                            <Text style={styles.title}>Niên hạn sử dụng (tính từ năm sx)</Text>
                            {slot15 === 0 ? null :
                                <Text style={styles.text}>
                                    - 25 năm: ô tô tải.{'\n'}
                                    - 20 năm: ô tô chở người trên 9 chỗ.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot16 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot16 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot16 === 0 ? setslot16(1) : setslot16(0)}>
                            <Text style={styles.title}>Biển báo cấm</Text>
                            {slot16 === 0 ? null :
                                <Text style={styles.text}>{['- Cấm ô tô (Gồm: mô tô 3 bánh, Xe Lam, xe khách) --> Cẩm xe tải --> Cầm Máy kéo --> Cầm rơ moóc, sơ mi rơ moóc']}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot17 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot17 === 0 ? 40 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot17 === 0 ? setslot17(1) : setslot17(0)}>
                            <Text style={styles.title}>Cấp phép</Text>
                            {slot17 === 0 ? null :
                                <Text style={styles.text}>- Đường cấm dừng, cấm đỗ, cấm đi do UBND cấp tỉnh cấp {'\n'}
                                    - Xe quá khổ, quá tải do: cơ quan quản lý đường bộ có thẩm quyền cấp phép
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot18 === 0 ? 50 : 100, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot18 === 0 ? 40 : 100, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot18 === 0 ? setslot18(1) : setslot18(0)}>
                            <Text style={styles.title}>Nồng độ cồn</Text>
                            {slot18 === 0 ? null :
                                <Text style={styles.text}>- Người điều khiển xe mô tô, ô tô, máy kéo trên đường mà {'\n'} trong máu hoặc hơi thở có nồng độ cồn: Bị nghiêm cấm
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot19 === 0 ? 50 : 160, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot19 === 0 ? 50 : 160, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot19 === 0 ? setslot19(1) : setslot19(0)}>
                            <Text style={styles.title}>Khoảng cách an toàn tối thiểu</Text>
                            {slot19 === 0 ? null :
                                <Text style={styles.text}>
                                    {[
                                        '- 35m nếu vận tốc lưu hành (V) = 60 (km/h)',
                                        '- 55m nếu 60 < (V) ≤ 80',
                                        '- 70m nếu 80 < (V) ≤ 100',
                                        '- 100m nếu 100 < (V) ≤ 120',
                                        '- Dưới 60km/h: Chủ động và đảm bảo khoảng cách',
                                    ].map((line, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && '\n'} {/* Xuống hàng giữa các dòng (không cần nếu chỉ có 1 dòng) */}
                                            {line}
                                        </React.Fragment>
                                    ))}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot20 === 0 ? 50 : 210, width: '100%', borderRadius: 8, borderLeftColor: 'orange', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot20 === 0 ? 50 : 210, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot20 === 0 ? setslot20(1) : setslot20(0)}>
                            <Text style={styles.title}>Hỏi về tuổi (T)</Text>
                            {slot20 === 0 ? null :
                                <Text style={styles.text}>- Tuổi tối đa hạng E: nam 55, nữ 50{'\n'}
                                    - Tuổi lấy bằng lái xe (cách nhau 3 tuổi){'\n'}
                                    - Gắn máy: 16T (dưới 50cm3){'\n'}
                                    - Mô tô + B1+B2: 18T{'\n'}
                                    - C, FB: 21T{'\n'}
                                    - D, FC: 24T{'\n'}
                                    - E, FD: 27T{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot21 === 0 ? 80 : 230, width: '100%', borderRadius: 8, borderLeftColor: 'purple', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot21 === 0 ? 80 : 230, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot21 === 0 ? setslot21(1) : setslot21(0)}>
                            <Text style={styles.title}>Trên đường cao tốc, trong đường hầm,{'\n'} đường vòng, đầu dốc, nơi tầm nhìn hạn chế</Text>
                            {slot21 === 0 ? null :
                                <Text style={styles.text}>- Không được quay đầu xe, không lùi, không vượt.{'\n'}
                                    - Không được vượt trên cầu hẹp có một làn xe.{'\n'}
                                    - Không được phép quay đầu xe ở phần đường dành cho người đi bộ qua đường.{'\n'}
                                    - Cẩm lùi xe ở khu vực cầm dừng và nơi đường bộ giao nhau.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot22 === 0 ? 50 : 100, width: '100%', borderRadius: 8, borderLeftColor: 'red', borderLeftWidth: 3, marginBottom: 5 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot22 === 0 ? 50 : 100, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot22 === 0 ? setslot22(1) : setslot22(0)}>
                            <Text style={styles.title}>Tại nơi giao nhau không có tín hiệu đèn</Text>
                            {slot22 === 0 ? null :
                                <Text style={styles.text}>- Có vòng xuyến: Nhường đường bên trái.{'\n'}
                                    - Không có vòng xuyến nhường bên phải
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot23 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'green', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot23 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot23 === 0 ? setslot23(1) : setslot23(0)}>
                            <Text style={styles.title}>Niên hạn sử dụng (tính từ năm sx)</Text>
                            {slot23 === 0 ? null :
                                <Text style={styles.text}>
                                    - 25 năm: ô tô tải.{'\n'}
                                    - 20 năm: ô tô chở người trên 9 chỗ.{'\n'}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: slot24 === 0 ? 50 : 120, width: '100%', borderRadius: 8, borderLeftColor: 'blue', borderLeftWidth: 3, marginBottom: 7 }}>
                        <TouchableOpacity style={{ width: '100%', height: slot24 === 0 ? 50 : 120, justifyContent: 'center', marginLeft: 4 }} onPress={() => slot24 === 0 ? setslot24(1) : setslot24(0)}>
                            <Text style={styles.title}>Biển báo cấm</Text>
                            {slot24 === 0 ? null :
                                <Text style={styles.text}>{['- Cấm ô tô (Gồm: mô tô 3 bánh, Xe Lam, xe khách) --> Cẩm xe tải --> Cầm Máy kéo --> Cầm rơ moóc, sơ mi rơ moóc']}
                                </Text>}
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        fontSize: 16,
        marginLeft: 20
    }
})
export default TrickPass