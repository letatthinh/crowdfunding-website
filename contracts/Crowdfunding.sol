pragma solidity ^0.6.1;

contract Crowdfunding
{
    enum CampaignStatus
    {
        Open,
        GoalAchieved,
        Closed
    }
    
    Campaign[] ListOfCampaigns;

    constructor() public
    {
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "Ngân hàng tranh Tòhe Bank 2",
                        "Tòhe Bank là ngân hàng tranh trẻ em trực tuyến đầu tiên và duy nhất tại Việt Nam (cho đến thời điểm hiện tại). Chúng tôi tập hợp, trưng bày và giới thiệu tranh vẽ của các em nhỏ ở khắp mọi nơi, không phân biệt quốc gia, dân tộc hay hoàn cảnh.",
                        "http://tohebank.com/painting",
                        1000000,
                        "http://tohebank.com/admin//uploads/news/1480251170PWN_7398-3.jpg",
                        "01/01/2020",
                        "01/19/2020",
                        "tu thien, tre em");
        ContributeToCampaign(0, 0xC3dCb581770c5C50aCDa46119732C505cEd8999c, 'today test', 20000);
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "Ngân hàng tranh Tòhe Bank 1",
                        "Tòhe Bank là ngân hàng tranh trẻ em trực tuyến đầu tiên và duy nhất tại Việt Nam (cho đến thời điểm hiện tại). Chúng tôi tập hợp, trưng bày và giới thiệu tranh vẽ của các em nhỏ ở khắp mọi nơi, không phân biệt quốc gia, dân tộc hay hoàn cảnh.",
                        "http://tohebank.com/painting",
                        1000000,
                        "http://tohebank.com/admin//uploads/news/1480251170PWN_7398-3.jpg",
                        "01/01/2020",
                        "01/19/2020",
                        "tu thien, tre em");
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "Ngân hàng tranh Tòhe Bank",
                        "Tòhe Bank là ngân hàng tranh trẻ em trực tuyến đầu tiên và duy nhất tại Việt Nam (cho đến thời điểm hiện tại). Chúng tôi tập hợp, trưng bày và giới thiệu tranh vẽ của các em nhỏ ở khắp mọi nơi, không phân biệt quốc gia, dân tộc hay hoàn cảnh.",
                        "http://tohebank.com/painting",
                        1000000,
                        "http://tohebank.com/admin//uploads/news/1480251170PWN_7398-3.jpg",
                        "01/01/2020",
                        "01/19/2020",
                        "tu thien, tre em");
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "Student Grow - Cộng đồng hổ trợ sinh viên UIT",
                        "Các chương trình đào tạo của Trường được thiết kế đáp ứng tốt nhu cầu học tập, nghiên cứu đa dạng của người học và cung cấp nguồn nhân lực chất lượng cao theo yêu cầu của xã hội về lĩnh vực CNTT&TT theo các cấp độ từ bậc đào tạo đại học đến sau đại học (bao gồm thạc sỹ và tiến sỹ). Trường có 17 chương trình chính quy đào tạo bậc kỹ sư và cử nhân. Bên cạnh đó, là một trong 08 trường trọng điểm về đào tạo ngành An toàn Thông tin của Việt Nam và đáp ứng các nhu cầu đặc biệt của xã hội, Trường có 07 chương trình đào tạo đặc biệt (hệ chính quy) các ngành: kỹ sư tài năng ngành An toàn Thông tin, chương trình tiên tiến ngành Hệ thống Thông tin, cử nhân tài năng ngành Khoa học Máy tính v.v…Ở bậc đào tạo sau đại học, có 03 chương trình đào tạo trình độ thạc sĩ (ngành khoa học máy tính, công nghệ thông tin và hệ thống thông tin) và 02 chương trình đào tạo trình độ tiến sĩ (ngành khoa học máy tính và công nghệ thông tin). Thông qua các chương trình đào tạo tiên tiến, CNTT được ứng dụng mạnh mẽ trong quá trình tổ chức đào tạo, thay đổi nội dung, phương pháp giảng dạy theo hướng hiện đại và bám sát các yêu cầu của thực tiễn, đồng thời tăng cường khả năng sử dụng tiếng Anh cho người học. Tổng số sinh viên, học viên cao học và nghiên cứu sinh hiện nay của Trường là hơn 6.000.",
                        "https://www.uit.edu.vn/",
                        35000000,
                        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t31.0-8/13221300_1083224231719576_2757809742062362212_o.jpg?_nc_cat=100&_nc_ohc=UnNSxQd9Y00AQnrja3lUaSCVeYoJdsdL94iHBRwrghOPUmq7d1mjABcKA&_nc_ht=scontent.fsgn5-5.fna&oh=6f5472b4d447541e8ba4c7dbc87d70b5&oe=5E9D1174",
                        "01/01/2020",
                        "01/20/2020",
                        "ý tưởng, sinh viên, dự án công nghệ, UIT");
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "VNPhoto - Cuộc thi chụp ảnh đẹp Việt Nam",
                        "Hãy cùng giúp đỡ những nhiếp ảnh gia có được những tấm hình đẹp nhất về quê hương đất nước Việt Nam.",
                        "https://www.uit.edu.vn/",
                        2000000,
                        "https://images.unsplash.com/photo-1521019795854-14e15f600980?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format",
                        "01/01/2020",
                        "01/21/2020",
                        "đất nước, quê hương, ảnh nghệ thuật");
        CreateNewCampaign(0xC3dCb581770c5C50aCDa46119732C505cEd8999c,
                        "Chiến dịch Tết sum vầy",
                        "Cùng chung tay ủng hộ các trẻ em nghèo để các em có thể khám phá ngày Tết truyền thống và những hoạt động thú vị trong ngày lễ này.",
                        "https://tuoitre.vn/hoat-dong-thien-nguyen-tet-tre-em-tai-le-hoi-tet-viet-2020-20200105091519287.htm",
                        7000000,
                        "https://images.pexels.com/photos/1212805/pexels-photo-1212805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "01/17/2020",
                        "02/15/2020",
                        "Tết, lễ hội, trẻ em");
    }

    struct Campaign
    {
        uint24 ID;
        address payable owner;
        string name;
        string description;
        string link;
        uint goal;
        string imageLink;
        string startDate;
        string endDate;
        string tags;
        CampaignStatus status;
        uint moneyCollected;
        uint24 totalContributors;
        mapping (uint24 => Contributor) contributors;
    }

    struct Contributor
    {
        address payable contributor;
        string date;
        uint amount;
    }
    
    function CreateNewCampaign
    (
        address payable _owner,
        string memory _name,
        string memory _description,
        string memory _link,
        uint _goal,
        string memory _imageLink,
        string memory _startDate,
        string memory _endDate,
        string memory _tags
    ) public
    {
        Campaign memory newCampaign = Campaign({
                                                ID: uint24(ListOfCampaigns.length),
                                                owner: _owner,
                                                name: _name,
                                                description: _description,
                                                link: _link,
                                                goal: _goal,
                                                imageLink: _imageLink,
                                                startDate: _startDate,
                                                endDate: _endDate,
                                                tags: _tags,
                                                status: CampaignStatus.Open,
                                                moneyCollected: 0,
                                                totalContributors: 0
                                            });

        ListOfCampaigns.push(newCampaign);
    }
    
    function ContributeToCampaign
    (
        uint24 _campaignID,
        address payable _contributor,
        string memory _date,
        uint _amount
    ) public
    {
        Contributor memory newContributor = Contributor({
                                                            contributor: _contributor,
                                                            date: _date,
                                                            amount: _amount
                                                        });
                                                        
        // add a new contribution record to the project's contributor list
        ListOfCampaigns[_campaignID].contributors[uint24(ListOfCampaigns[_campaignID].totalContributors)] = newContributor;
        ListOfCampaigns[_campaignID].totalContributors += 1;
        
        // Update the total money funded
        ListOfCampaigns[_campaignID].moneyCollected += _amount;
        if (ListOfCampaigns[_campaignID].moneyCollected >= ListOfCampaigns[_campaignID].goal)
        {
            ListOfCampaigns[_campaignID].status = CampaignStatus.GoalAchieved;
        }
    }
    
    function CloseCampaign(uint24 _campaignID) public
    {
        ListOfCampaigns[_campaignID].status = CampaignStatus.Closed;
    }
    
    function GetNumberOfCampaigns() public view returns (uint)
    {
        return ListOfCampaigns.length;
    }
    
    function GetCampaignOwner(uint24 _campaignID) public view returns (address)
    {
        return ListOfCampaigns[_campaignID].owner;
    }
    
    function GetCampaignID(uint24 _campaignID) public view returns (uint24)
    {
        return ListOfCampaigns[_campaignID].ID;
    }
    
    function GetCampaignImageLink(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].imageLink;
    }
    
    function GetCampaignName(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].name;
    }
    
    function GetCampaignDescription(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].description;
    }
    
    function SetCampaignDescription(uint24 _campaignID, string memory _description) public
    {
        ListOfCampaigns[_campaignID].description = _description;
    }
    
    function GetCampaignLink(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].link;
    }
    
    function GetCampaignStartDate(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].startDate;
    }
    
    function GetCampaignEndDate(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].endDate;
    }
    
    function GetCampaignTags(uint24 _campaignID) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].tags;
    }
    
    function GetCampaignStatus(uint24 _campaignID) public view returns (CampaignStatus)
    {
        return ListOfCampaigns[_campaignID].status;
    }
    
    function GetCampaignGoal(uint24 _campaignID) public view returns (uint)
    {
        return ListOfCampaigns[_campaignID].goal;
    }
    
    function GetCampaignMoneyCollected(uint24 _campaignID) public view returns (uint)
    {
        return ListOfCampaigns[_campaignID].moneyCollected;
    }
    
    function GetCampaignTotalContributors(uint24 _campaignID) public view returns (uint24)
    {
        return ListOfCampaigns[_campaignID].totalContributors;
    }
    
    function GetCampaignContributor(uint24 _campaignID, uint24 _index) public view returns (address)
    {
        return ListOfCampaigns[_campaignID].contributors[_index].contributor;
    }
    
    function GetCampaignContributionDate(uint24 _campaignID, uint24 _index) public view returns (string memory)
    {
        return ListOfCampaigns[_campaignID].contributors[_index].date;
    }
    
    function GetCampaignContributionAmount(uint24 _campaignID, uint24 _index) public view returns (uint)
    {
        return ListOfCampaigns[_campaignID].contributors[_index].amount;
    }
}