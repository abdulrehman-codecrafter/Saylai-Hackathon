import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { Routes, Route } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { items } from "./MenuItems";
import Home from "./Home";
import Orders from "./Orders";
import Users from "./Users";
import AllProducts from "./Products/AllProducts";
import AddProduct from "./Products/AddProduct";


export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Header />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical "  />
          {/* <h4 className="text-center text-white mt-4 mb-4 fst-italic" style={{  fontFamily: "Matemasie"}}>Food <br />man</h4> */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          
          <Content>
          

            <Routes>
              <Route index element={<Home />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
