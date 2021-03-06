import React, { Component } from 'react';
import { List, Card, Avatar, Row, Col, Carousel } from 'antd';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  async componentDidMount() {
        /*
    const namespaces = axios.get('/api/namespaces');
    this.setState({list: namespaces});
*/
    setTimeout(() => {
      this.setState({
        list: [{
          name: "测试任务",
          desc: "task description",
        }, {
          name: "chaos test",
          desc: "description",
        }, {
          name: "this is a test",
          desc: "task description",
        }, {
          name: "dashboard test",
          desc: "description",
        }, {
          name: "screenshot test",
          desc: "task description",
        }, {
          name: "vvv test",
          desc: "description",
        }],
      });
    }, 2000);
  }

  render() {
    return (<Row type="flex" justify="space-around" style={{marginTop: 12}}>
      <Col span={18}>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={this.state.list || []}
          renderItem={item => (
            <List.Item>
              <a href={item.grafana} target="_blank" rel="noopener noreferrer">
                <Card 
                  cover={<Carousel autoplay>
                    <iframe src={`/dashboard/${item.name}/d-solo/H3wXWqfWz/chaos-monitor?&panelId=2`}
                            width="300" 
                            height="150" 
                            frameBorder="0">        
                    </iframe>
                    <iframe src={`/dashboard/${item.name}/d-solo/H3wXWqfWz/chaos-monitor?&panelId=3`} 
                            width="300" 
                            height="150" 
                            frameBorder="0">        
                    </iframe>
                  </Carousel>
                    
                  }
                >
                  <Card.Meta
                    avatar={<Avatar style={{background: this.color(item.name)}}>{item.name[0].toUpperCase()}</Avatar>}
                    title={item.name}
                    description={item.desc}
                  />
                </Card>
              </a>
            </List.Item>
          )}
          loading={!this.state.list}
        />
      </Col>
    </Row>);
  }

  color(str) {
    const char = str[0];
    const colors = ["#f50", "#2db7f5", "#87d068", "#108ee9"];
    return colors[char.charCodeAt() % colors.length];
  }
}

export default App;
