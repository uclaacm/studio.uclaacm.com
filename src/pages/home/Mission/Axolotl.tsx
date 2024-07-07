import { Box, BoxProps } from "@mui/material"
import { motion } from "framer-motion";
import React from "react";

export type AxolotlProps = Omit<BoxProps, "component" | keyof React.SVGProps<SVGElement>> & Omit<React.SVGProps<SVGElement>, keyof BoxProps>;

export default function Axolotl(props: AxolotlProps) {


	return (
		<Box component={motion.svg} width="1661" height="2170" viewBox="0 0 1661 2170" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g id="Axolotl">
				<motion.g id="left arm"
					initial={{ rotate: -5, }}
					animate={{ rotate: 5, }}
					transition={{
						delay: 1,
						duration: 2,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut" }}
					style={{ originX: 1 }}
				>
					<g id="Vector 1925">
						<path d="M625.229 985.821C526.192 1002.55 435.048 991.1 345.84 926.322C248.785 855.844 200.448 789.332 163.701 688.858" stroke="#FD8FA4" stroke-width="71.408" stroke-linecap="round" />
						<path d="M625.229 985.821C526.192 1002.55 435.048 991.1 345.84 926.322C248.785 855.844 200.448 789.332 163.701 688.858" stroke="url(#paint0_linear_542_733)" stroke-width="71.408" stroke-linecap="round" />
					</g>
					<g id="Vector 1924">
						<path d="M66.8894 649.958C64.8054 675.308 78.7787 685.466 100.498 692.904C101.015 693.081 101.563 693.164 102.103 693.15L181.755 691.052C183.697 691.001 185.668 692.165 187.236 693.34C197.836 701.283 242.029 714.952 253.535 691.9C265.785 667.36 246.454 650.336 221.159 636.941C219.251 635.93 218.317 633.8 218.706 631.819C223.476 607.538 196.522 582.938 168.452 592.435C145.004 600.368 138.158 612.732 137.262 626.159C137.015 629.873 132.137 632.064 128.8 629.938C98.1923 610.436 68.8151 626.532 66.8894 649.958Z" fill="url(#paint1_linear_542_733)" />
						<path d="M66.8894 649.958C64.8054 675.308 78.7787 685.466 100.498 692.904C101.015 693.081 101.563 693.164 102.103 693.15L181.755 691.052C183.697 691.001 185.668 692.165 187.236 693.34C197.836 701.283 242.029 714.952 253.535 691.9C265.785 667.36 246.454 650.336 221.159 636.941C219.251 635.93 218.317 633.8 218.706 631.819C223.476 607.538 196.522 582.938 168.452 592.435C145.004 600.368 138.158 612.732 137.262 626.159C137.015 629.873 132.137 632.064 128.8 629.938C98.1923 610.436 68.8151 626.532 66.8894 649.958Z" stroke="#FD8FA4" stroke-width="2.12306" />
						<path d="M66.8894 649.958C64.8054 675.308 78.7787 685.466 100.498 692.904C101.015 693.081 101.563 693.164 102.103 693.15L181.755 691.052C183.697 691.001 185.668 692.165 187.236 693.34C197.836 701.283 242.029 714.952 253.535 691.9C265.785 667.36 246.454 650.336 221.159 636.941C219.251 635.93 218.317 633.8 218.706 631.819C223.476 607.538 196.522 582.938 168.452 592.435C145.004 600.368 138.158 612.732 137.262 626.159C137.015 629.873 132.137 632.064 128.8 629.938C98.1923 610.436 68.8151 626.532 66.8894 649.958Z" stroke="url(#paint2_linear_542_733)" stroke-width="2.12306" />
					</g>
				</motion.g>
				<g id="shadow" filter="url(#filter0_f_542_733)">
					<ellipse id="Ellipse 3617" cx="633.9" cy="121.402" rx="633.9" ry="121.402" transform="matrix(-1 -1.25792e-08 -9.74072e-09 1 1388.58 1855.27)" fill="#33273C" fill-opacity="0.2" />
				</g>
				<g id="right leg">
					<g id="Vector 1926">
						<path d="M760.374 1418.35C775.929 1507.53 800.024 1622.88 837.647 1724.28C873.102 1819.83 896.406 1865.31 943.423 1968.4" stroke="#FD8FA4" stroke-width="71.408" stroke-linecap="round" />
						<path d="M760.374 1418.35C775.929 1507.53 800.024 1622.88 837.647 1724.28C873.102 1819.83 896.406 1865.31 943.423 1968.4" stroke="url(#paint3_linear_542_733)" stroke-width="71.408" stroke-linecap="round" />
					</g>
					<path id="Vector 1924_2" d="M709.406 1943.83C709.62 1967.79 726.896 1983.18 743.678 1987.4C747.753 1988.43 754.609 1996.18 758.424 1997.97C771.74 2004.24 812.633 2005.03 855.524 2004.22C904.139 2003.3 956.217 2001.88 964.428 1988.22C964.918 1987.4 964.876 1986.39 964.522 1985.47L940.88 1923.89C933.582 1897.48 889.983 1894.17 854.544 1894.42C820.337 1894.66 773.509 1889.07 757.408 1910.79C756.36 1912.2 754.542 1912.96 752.69 1912.61C725.698 1907.45 709.146 1914.67 709.406 1943.83Z" fill="url(#paint4_linear_542_733)" />
				</g>
				<g id="left leg">
					<g id="Vector 1927">
						<path d="M528.18 1337.36C518.035 1435.79 489.971 1529.32 478.402 1627.98C469.372 1704.99 451.494 1803.8 461.647 1904.76" stroke="#FFC2CE" stroke-width="71.408" stroke-linecap="round" />
						<path d="M528.18 1337.36C518.035 1435.79 489.971 1529.32 478.402 1627.98C469.372 1704.99 451.494 1803.8 461.647 1904.76" stroke="url(#paint5_linear_542_733)" stroke-opacity="0.2" stroke-width="71.408" stroke-linecap="round" />
					</g>
					<path id="Vector 1924_3" d="M223.695 1893.77C225.572 1918.1 244.474 1932.6 261.759 1935.57C265.837 1936.28 271.355 1942.7 274.927 1944.54C287.072 1950.8 329.351 1949.39 373.654 1946.15C422.236 1942.6 474.256 1938.35 481.321 1924.19C481.715 1923.4 481.622 1922.51 481.257 1921.72L453.386 1861.35C444.303 1835.38 392.075 1835.22 356.718 1837.39C322.759 1839.47 283.759 1835.74 269.539 1857.87C268.493 1859.5 266.429 1860.48 264.344 1860.21C237.313 1856.66 221.463 1864.84 223.695 1893.77Z" fill="url(#paint6_linear_542_733)" stroke="#FFC2CE" stroke-width="2.12306" />
				</g>
				<g id="right fin">
					<path id="Vector 44" d="M662.339 253.099C595.671 238.549 563.174 347.264 555.16 404.979C551.695 429.938 582.409 510.65 685.328 495.425C824.141 474.89 846.168 417.463 827.926 384.577C826.503 382.012 827.961 378.577 830.984 377.624C964.466 335.548 920.138 256.234 876.584 236.16C874.672 235.279 873.653 233.18 874.131 231.18C929.432 -0.62827 777.777 76.829 749.547 159.589C748.465 162.763 744.156 164.1 741.304 162.297C699.68 135.989 676.271 205.176 668.684 249.224C668.212 251.961 665.175 253.718 662.339 253.099Z" fill="url(#paint7_linear_542_733)" />
					<path id="Vector 45" d="M809.544 174.279C776.268 239.117 661.876 356.416 599.501 410.522C599.001 410.956 598.628 411.474 598.365 412.09C572.555 472.558 551.312 556.787 683.976 452.487C799.852 361.387 824.043 243.023 821.37 175.93C821.17 170.914 811.818 169.847 809.544 174.279Z" fill="url(#paint8_linear_542_733)" />
				</g>
				<g id="tail">
					<path id="Vector 50" d="M1287.5 1020.13C1395.13 956.078 1539.49 966.621 1566.28 975.343C1593.06 984.065 1605.81 977.977 1612.68 972.421C1619.56 966.866 1623.53 954.37 1604.31 939.536C1585.62 925.119 1530.25 922.288 1497.07 920.639C1495.58 920.565 1494.91 919.726 1495.54 918.852C1514.53 892.484 1458.1 861.586 1348.2 851.247C1236.01 840.692 1106.54 866.036 1026.68 898.528C946.826 931.02 895.343 996.263 898.985 1033.82C901.646 1061.26 885.501 1081.76 874.925 1090.52C873.707 1091.53 871.344 1091.57 870.592 1090.7C862.399 1081.14 838.371 1071.4 795.448 1097.27C749.624 1124.88 755.176 1176.24 763.727 1198.64C763.77 1198.75 763.838 1198.85 763.934 1198.94L906.026 1338.17C906.199 1338.34 906.437 1338.47 906.751 1338.55C942.113 1348.43 1029.82 1358.47 1101.7 1320.52C1173.9 1282.41 1173.56 1215.75 1164.36 1187.18C1160.56 1158.18 1179.87 1084.19 1287.5 1020.13Z" fill="url(#paint9_linear_542_733)" />
					<path id="Vector 51" d="M1388.2 932.255C1284.76 970.692 1069.58 1105.29 972.871 1173.67C972.67 1173.81 972.445 1173.92 972.177 1174.02C872.007 1211.61 731.986 1252.71 912.051 1116.15C1075.1 992.488 1278.44 941.188 1384.1 927.297C1388.29 926.746 1391.71 930.948 1388.2 932.255Z" fill="url(#paint10_linear_542_733)" />
				</g>
				<path id="body" d="M396.997 1205.52C390.578 1316.13 508.989 1447.22 643.396 1447.22C821.456 1447.22 926.929 1392.14 926.929 1183.53C926.929 949.156 804.014 781.153 625.954 781.153C447.894 781.153 402.06 1118.27 396.997 1205.52Z" fill="url(#paint11_linear_542_733)" />
				<path id="head" d="M324.97 659.435C313.012 800.453 481.898 880.709 684.29 894.343C886.682 907.977 1049.76 846.791 1061.72 705.773C1066.85 561.261 923.792 421.582 717.876 414.295C515.484 400.661 337.74 508.853 324.97 659.435Z" fill="url(#paint12_linear_542_733)" />
				<g id="face">
					<ellipse id="left eye" cx="23.8619" cy="54.1794" rx="23.8619" ry="54.1794" transform="matrix(-0.955167 -0.309866 -0.148604 0.986299 714.515 606.232)" fill="url(#paint13_linear_542_733)" />
					<path id="mouth" d="M524.815 764.178C503.708 779.931 467.533 780.041 456.118 745.2" stroke="#631E30" stroke-width="9.86856" stroke-linecap="round" />
					<path id="mouth_2" d="M598.041 762.215C584.331 783.491 550.42 794.722 526.217 765.531" stroke="#631E30" stroke-width="9.86856" stroke-linecap="round" />
					<ellipse id="left eye_2" cx="23.8619" cy="54.1794" rx="23.8619" ry="54.1794" transform="matrix(-0.955167 -0.309866 -0.148604 0.986299 445.588 565.764)" fill="url(#paint14_linear_542_733)" />
				</g>
				<g id="left fin">
					<path id="Vector 44_2" d="M1072.89 347.801C1009.42 309.973 929.118 412.6 896.144 470.207C881.887 495.114 879.588 589.852 993.621 608.781C1147.64 634.349 1195.05 581.612 1189.84 541.05C1189.44 537.933 1192.26 534.958 1195.73 534.988C1353.3 536.327 1340.96 438.526 1304.05 402.703C1302.38 401.081 1302.17 398.489 1303.51 396.567C1460.18 172.915 1268.35 202.704 1203.71 279.74C1201.28 282.632 1196.25 282.434 1194 279.543C1161.66 238.073 1107.66 302.641 1081.02 346.072C1079.41 348.695 1075.59 349.411 1072.89 347.801Z" fill="url(#paint15_linear_542_733)" />
					<path id="Vector 45_2" d="M1260.29 315.229C1197.89 371.729 1028.29 455.616 940.06 491.029C939.389 491.298 938.815 491.69 938.308 492.213C885.558 546.663 827.381 627.552 1010.51 563.453C1170.17 507.567 1245.9 392.334 1271.81 321.294C1273.73 316.021 1264.48 311.434 1260.29 315.229Z" fill="url(#paint16_linear_542_733)" />
				</g>
				<motion.g id="right arm"
					initial={{ rotate: -5, }}
					animate={{ rotate: 5, }}
					transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
					style={{ originX: 1 }}
				>
					<g id="Vector 1925_2">
						<path d="M709.223 1025.67C629.988 1081.2 543.188 1108.5 430.52 1087.67C307.939 1065.01 230.642 1025.85 146.062 951.788" stroke="#FD8FA4" stroke-width="71.408" stroke-linecap="round" />
						<path d="M709.223 1025.67C629.988 1081.2 543.188 1108.5 430.52 1087.67C307.939 1065.01 230.642 1025.85 146.062 951.788" stroke="url(#paint17_linear_542_733)" stroke-width="71.408" stroke-linecap="round" />
					</g>
					<g id="Vector 1924_4">
						<path d="M40.0323 957.049C51.2863 980.381 68.9206 983.668 92.0134 981.354C92.6011 981.296 93.1751 981.13 93.6943 980.871L163.185 946.334C164.911 945.476 167.16 945.652 169.064 946.054C182.314 948.849 229.076 942.886 227.355 917.575C225.524 890.648 199.345 883.539 169.812 882.089C167.774 881.989 166.092 880.688 165.503 878.952C157.44 855.182 120.509 844.202 100.404 864.271C83.9402 880.706 84.0146 894.334 89.9089 906.483C91.5624 909.891 87.9131 914.219 83.7685 913.742C47.099 909.516 29.7036 935.634 40.0323 957.049Z" fill="url(#paint18_linear_542_733)" />
						<path d="M40.0323 957.049C51.2863 980.381 68.9206 983.668 92.0134 981.354C92.6011 981.296 93.1751 981.13 93.6943 980.871L163.185 946.334C164.911 945.476 167.16 945.652 169.064 946.054C182.314 948.849 229.076 942.886 227.355 917.575C225.524 890.648 199.345 883.539 169.812 882.089C167.774 881.989 166.092 880.688 165.503 878.952C157.44 855.182 120.509 844.202 100.404 864.271C83.9402 880.706 84.0146 894.334 89.9089 906.483C91.5624 909.891 87.9131 914.219 83.7685 913.742C47.099 909.516 29.7036 935.634 40.0323 957.049Z" stroke="#FD8FA4" stroke-width="2.12306" />
						<path d="M40.0323 957.049C51.2863 980.381 68.9206 983.668 92.0134 981.354C92.6011 981.296 93.1751 981.13 93.6943 980.871L163.185 946.334C164.911 945.476 167.16 945.652 169.064 946.054C182.314 948.849 229.076 942.886 227.355 917.575C225.524 890.648 199.345 883.539 169.812 882.089C167.774 881.989 166.092 880.688 165.503 878.952C157.44 855.182 120.509 844.202 100.404 864.271C83.9402 880.706 84.0146 894.334 89.9089 906.483C91.5624 909.891 87.9131 914.219 83.7685 913.742C47.099 909.516 29.7036 935.634 40.0323 957.049Z" stroke="url(#paint19_linear_542_733)" stroke-width="2.12306" />
					</g>
				</motion.g>
			</g>
			<defs>
				<filter id="filter0_f_542_733" x="49.3719" y="1783.86" width="1410.62" height="385.62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="35.704" result="effect1_foregroundBlur_542_733" />
				</filter>
				<linearGradient id="paint0_linear_542_733" x1="586.762" y1="804.866" x2="205.586" y2="885.896" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FFC2CE" />
				</linearGradient>
				<linearGradient id="paint1_linear_542_733" x1="125.071" y1="680.588" x2="121.197" y2="606.897" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FEC2CD" />
					<stop offset="1" stop-color="#FF8095" />
				</linearGradient>
				<linearGradient id="paint2_linear_542_733" x1="182.05" y1="720.372" x2="145.573" y2="599.304" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FFC2CE" />
				</linearGradient>
				<linearGradient id="paint3_linear_542_733" x1="788.422" y1="1461.66" x2="836.643" y2="1809.66" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FFC2CE" />
				</linearGradient>
				<linearGradient id="paint4_linear_542_733" x1="838.598" y1="1927.68" x2="646.912" y2="2108.61" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FEC2CD" />
					<stop offset="1" stop-color="#FF8095" />
				</linearGradient>
				<linearGradient id="paint5_linear_542_733" x1="549.592" y1="1836.21" x2="531.796" y2="1337.96" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FF2953" />
				</linearGradient>
				<linearGradient id="paint6_linear_542_733" x1="508.059" y1="1898.84" x2="193.232" y2="2178.39" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FEC2CD" />
					<stop offset="1" stop-color="#FF8095" />
				</linearGradient>
				<linearGradient id="paint7_linear_542_733" x1="889.924" y1="96.9156" x2="663.57" y2="515.895" gradientUnits="userSpaceOnUse">
					<stop offset="0.223958" stop-color="#EE6B90" />
					<stop offset="0.638338" stop-color="#F78CAB" />
					<stop offset="1" stop-color="#FFA8C3" />
				</linearGradient>
				<linearGradient id="paint8_linear_542_733" x1="815.919" y1="147.752" x2="599.324" y2="504.563" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC8D3" />
					<stop offset="1" stop-color="#FB6683" />
				</linearGradient>
				<linearGradient id="paint9_linear_542_733" x1="1563.87" y1="904.72" x2="1030.29" y2="1507.36" gradientUnits="userSpaceOnUse">
					<stop stop-color="#ED3266" />
					<stop offset="1" stop-color="#FA85A8" />
				</linearGradient>
				<linearGradient id="paint10_linear_542_733" x1="1416.59" y1="925.797" x2="1088.47" y2="1388.58" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC8D3" />
					<stop offset="1" stop-color="#FB6683" />
				</linearGradient>
				<linearGradient id="paint11_linear_542_733" x1="631.572" y1="781.153" x2="631.572" y2="1478.2" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FC8199" />
					<stop offset="1" stop-color="#FFCAD3" />
				</linearGradient>
				<linearGradient id="paint12_linear_542_733" x1="781.838" y1="583.824" x2="810.248" y2="842.405" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD3" />
					<stop offset="1" stop-color="#FFA6B6" />
				</linearGradient>
				<linearGradient id="paint13_linear_542_733" x1="23.8619" y1="0" x2="23.8619" y2="108.359" gradientUnits="userSpaceOnUse">
					<stop stop-color="#953F68" />
					<stop offset="1" stop-color="#4B0E16" />
				</linearGradient>
				<linearGradient id="paint14_linear_542_733" x1="23.8619" y1="0" x2="23.8619" y2="108.359" gradientUnits="userSpaceOnUse">
					<stop stop-color="#953F68" />
					<stop offset="1" stop-color="#4B0E16" />
				</linearGradient>
				<linearGradient id="paint15_linear_542_733" x1="1377.23" y1="261.617" x2="968.771" y2="630.13" gradientUnits="userSpaceOnUse">
					<stop offset="0.223958" stop-color="#F34777" />
					<stop offset="1" stop-color="#FFA8C3" />
				</linearGradient>
				<linearGradient id="paint16_linear_542_733" x1="1278.23" y1="289.685" x2="902.933" y2="593.02" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFC8D3" />
					<stop offset="1" stop-color="#FB6683" />
				</linearGradient>
				<linearGradient id="paint17_linear_542_733" x1="581.489" y1="880.897" x2="301.489" y2="1127.95" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FFC2CE" />
				</linearGradient>
				<linearGradient id="paint18_linear_542_733" x1="107.506" y1="960.323" x2="71.8893" y2="893.363" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FEC2CD" />
					<stop offset="1" stop-color="#FF8095" />
				</linearGradient>
				<linearGradient id="paint19_linear_542_733" x1="178.646" y1="972.214" x2="88.644" y2="875.142" gradientUnits="userSpaceOnUse">
					<stop stop-color="#FFCAD4" />
					<stop offset="1" stop-color="#FFC2CE" />
				</linearGradient>
			</defs>
		</Box>
	)
}